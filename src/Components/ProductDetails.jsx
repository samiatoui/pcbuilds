import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://backend-flame-gamma.vercel.app/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleClick = () => {
        if (product) {
            navigate('/checkout', {
                state: {
                    productId: product.product_id,
                    productName: product.name,
                    productPrice: product.price,
                },
            });
        }
    }

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div style={{ justifyContent: 'center', textAlign: 'center', display: 'flex', marginTop: '50px', paddingBottom: '50px', gap: '2rem' }}>
            <div className='product-img'>
                {product.img_url_1 && <img src={product.img_url_1} alt={product.name} />}

            </div>
            <div className='product-info'>
                <h1>{product.name}</h1>
                <h2>${product.price}</h2>

                The build may include slightly varied components or equivalent alternatives, depending on availability, that offer equal or superior performance.
                <p>{product.description}</p>
                <p>Stock: {product.stock_quantity}</p>
                <button className='addtocart' onClick={handleClick}>
                    Buy Now
                </button>
            </div>

        </div>
    );
};

export default ProductDetail;
