import express from 'express';
import cors from 'cors';
import { query } from './db.js';
import { pool } from './db.js';  // Import pool from db.js

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Endpoint to fetch all products
app.get('/api/products', async (req, res) => {
  try {
    // Execute query to fetch all products
    const result = await query('SELECT * FROM products'); 
    
    // Send the list of products as a response
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server Error');
  }
});

// Endpoint to add a new product
app.post('/api/products', async (req, res) => {
  const { name, description, price, stock_quantity } = req.body;

  console.log('Received product data:', req.body);  // Add this line to log the received data
  
  // Validate input
  if (!name || !price ) {
    console.log('Missing required fields');  // Log if any required fields are missing
    return res.status(400).send('Missing required fields');
  }

  try {
    // SQL query to insert product into the database
    const query = `
      INSERT INTO products (name, description, price, stock_quantity)
      VALUES ($1, $2, $3, $4) RETURNING product_id, name, description, price, stock_quantity;
    `;
    const values = [name, description, price, stock_quantity];

    console.log('Executing query with values:', values);  // Log the query execution

    // Execute the query
    const result = await pool.query(query, values);

    // Return the newly created product
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding product:', err);  // Log the error to the backend console
    res.status(500).send(`Server Error: ${err.message}`);  // Send detailed error message back to frontend
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
