import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
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
  
    // Render loading, error, or the product list
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
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.product_id}>
                  <td>{product.product_id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.stock_quantity}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {[product.img_url_1, product.img_url_2, product.img_url_3, product.img_url_4]
                        .filter(url => url) // Filter out empty or null URLs
                        .map((url, index) => (
                          <img key={index} src={url} alt={`Product ${product.name}`} width="50" height="50" style={{ borderRadius: '5px' }} />
                        ))}
                    </div>
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
