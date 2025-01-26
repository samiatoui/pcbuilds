import React, { useState } from 'react';

function AddProductForm() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Before conversion:', productData);  // Log product data before conversion
  
    // Convert price to a number and stock_quantity to an integer
    const productPayload = {
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),  // Ensure price is a number
      stock_quantity: parseInt(productData.stock_quantity, 10),  // Ensure stock_quantity is an integer
    };
  
    console.log('After conversion:', productPayload);  // Log product data after conversion
  
    try {
      setLoading(true);
      setError('');
  
      // Make a POST request to add the new product
      const response = await fetch('http://localhost:5001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productPayload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
  
      const result = await response.json();  // Get the response data
      console.log('Product added:', result);  // Log the newly added product
  
      setProductData({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
      });
      window.location.reload();
    } catch (error) {
      console.error('Error adding product:', error);
      setError('There was an error adding the product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            min="0"
            step="any"
          />
        </div>
        <div>
          <label>Stock Quantity</label>
          <input
            type="number"
            name="stock_quantity"
            value={productData.stock_quantity}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AddProductForm;
