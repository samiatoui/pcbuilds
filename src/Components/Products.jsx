import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://backend-flame-gamma.vercel.app/api/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
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
    <>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        marginBottom: "50px",
        marginTop:"50px",
        maxWidth: "1200px",
        flexWrap: "wrap",
      }}
    >
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((product) => (
          <div
            key={product.product_id}
            style={{
              padding: "30px 30px",
              textAlign: "left",
              color: "white",
              border: ".5px solid rgb(16, 15, 15)",
              backgroundColor: "rgb(18, 18, 18)",
              borderRadius: "7px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Soft shadow
              maxWidth:'500px'
            }}
          >
            <img
              src={product.img_url_1}
              alt={product.name}
              style={{ width: "200px", objectFit: "cover" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: "16px" }}>{product.name}</h3>
              <p>${product.price}</p>
            </div>
            <div
              className="pc-spec"
              style={{
                backgroundColor: "var(--accent-colorflat)",
                color: "white",
                padding: "0px 2px",
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "-20px",
              }}
            >
              <p>{product.product_level}</p>
            </div>
            <Link style={{ color: "black" }}to={`/prebuilts/${product.product_id}`}>
              <div style={{display:'flex',justifyContent:'center', color:"white", border: 'solid .5px  white', width: '100%', }}><p>View PC</p></div>
            </Link>
          </div>
         
        ))
        
      )}
      
    </div>
    
    </>
  );
};

export default Product;
