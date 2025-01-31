import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Product = () => {
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
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '50px' }}>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((product) => (
          <div key={product.product_id} style={{ border: 'solid 1px grey', borderRadius: '3px', padding: '25px', textAlign: 'left' }}>
            <img src={product.img_url_1} alt={product.name} style={{ width: '200px', objectFit: 'cover' }} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <Link to={`/product/${product.product_id}`}>
              <button style={{ display: 'block', margin: '0 auto' }}>See Details</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Product;
