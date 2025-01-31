import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState(null);

    // Fetch products when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://backend-flame-gamma.vercel.app/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);  // Set the products state
            } catch (err) {
                setError(err.message);  // Set error message if fetching fails
            } finally {
                setLoading(false);  // Set loading to false after the fetch is done
            }
        };

        fetchProducts();
    }, []);  // Empty dependency array ensures this runs once on mount

    // Start editing a product
    const handleEdit = (productId) => {
        setEditingProductId(productId);
        const productToEdit = products.find(product => product.product_id === productId);
        setEditedProduct({ ...productToEdit });
    };

    // Handle input changes while editing
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // Save the changes to the backend
    const handleSave = async () => {
        try {
            const response = await fetch(`https://backend-flame-gamma.vercel.app/api/products/${editedProduct.product_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProduct),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const updatedProduct = await response.json();
            // Update the product list with the updated product
            setProducts(products.map(product =>
                product.product_id === updatedProduct.product_id ? updatedProduct : product
            ));
            setEditingProductId(null); // Close the edit mode
        } catch (err) {
            setError(err.message);
        }
    };

    // Cancel editing and revert to the original data
    const handleCancel = () => {
        setEditingProductId(null);
        setEditedProduct(null);
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Product List</h1>

            {products.length === 0 ? (
                <p>No products available</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock Quantity</th>
                            <th>Images</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.product_id}>
                                <td>{product.product_id}</td>

                                <td>
                                    {editingProductId === product.product_id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedProduct.name}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        product.name
                                    )}
                                </td>

                                <td>
                                    {editingProductId === product.product_id ? (
                                        <input
                                            type="text"
                                            name="description"
                                            value={editedProduct.description}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        product.description
                                    )}
                                </td>

                                <td>
                                    {editingProductId === product.product_id ? (
                                        <input
                                            type="number"
                                            name="price"
                                            value={editedProduct.price}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        `$${product.price}`
                                    )}
                                </td>

                                <td>
                                    {editingProductId === product.product_id ? (
                                        <input
                                            type="number"
                                            name="stock_quantity"
                                            value={editedProduct.stock_quantity}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        product.stock_quantity
                                    )}
                                </td>

                                <td>
                                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                        {[product.img_url_1, product.img_url_2, product.img_url_3, product.img_url_4]
                                            .map((url, index) => (
                                                <div key={index}>
                                                    {editingProductId === product.product_id ? (
                                                        <input
                                                            type="text"
                                                            name={`img_url_${index + 1}`}
                                                            value={editedProduct[`img_url_${index + 1}`] || ''}  // Display empty if URL is null or undefined
                                                            onChange={handleChange}
                                                            placeholder={`Image URL ${index + 1}`}
                                                            style={{ width: '100px' }}
                                                        />
                                                    ) : url ? (
                                                        <img
                                                            src={url}
                                                            alt={`Product ${product.name} - Image ${index + 1}`}
                                                            width="50"
                                                            height="50"
                                                            style={{ borderRadius: '5px' }}
                                                        />
                                                    ) : (
                                                        <span>No image</span>  // If no URL exists, display 'No image'
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                </td>


                                <td>
                                    {editingProductId === product.product_id ? (
                                        <>
                                            <button onClick={handleSave}>Save</button>
                                            <button onClick={handleCancel}>Cancel</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEdit(product.product_id)}>Modify</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;
