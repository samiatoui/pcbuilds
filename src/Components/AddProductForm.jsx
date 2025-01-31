import React, { useState } from 'react';

function AddProductForm() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    img_url_1: '',
    img_url_2: '',
    img_url_3: '',
    img_url_4: '',
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
    console.log('Before conversion:', productData);

    // Convert price to a number and stock_quantity to an integer
    const productPayload = {
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),
      stock_quantity: parseInt(productData.stock_quantity, 10),
      img_url_1: productData.img_url_1 || null,
      img_url_2: productData.img_url_2 || null,
      img_url_3: productData.img_url_3 || null,
      img_url_4: productData.img_url_4 || null,
    };

    console.log('After conversion:', productPayload);

    try {
      setLoading(true);
      setError('');

      const response = await fetch('https://backend-flame-gamma.vercel.app/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      console.log('Product added:', result);

      setProductData({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        img_url_1: '',
        img_url_2: '',
        img_url_3: '',
        img_url_4: '',
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
        <div>
          <label>Image URL 1</label>
          <input
            type="url"
            name="img_url_1"
            value={productData.img_url_1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL 2</label>
          <input
            type="url"
            name="img_url_2"
            value={productData.img_url_2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL 3</label>
          <input
            type="url"
            name="img_url_3"
            value={productData.img_url_3}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL 4</label>
          <input
            type="url"
            name="img_url_4"
            value={productData.img_url_4}
            onChange={handleChange}
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
