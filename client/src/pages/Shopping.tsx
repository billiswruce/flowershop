import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";

export const Shopping = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          console.error("Server responded with status", response.status);
          throw new Error("Server error");
        }

        const data = await response.json();
        console.log("Fetched products:", data); // Log fetched data to inspect its structure
        setProducts(data || []); // Ändrad från data.data till bara data
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products.length) {
    return <p>Loading...</p>; // Render a loading message while products are being fetched
  }

  return (
    <div className="shopping-container">
      <h1 className="welcome">Welcome to!</h1>
      <h1 className="title">Poppy Blossoms</h1>
      <h2 className="title">Products</h2>
      <div className="grid-container">
        {products.map(
          (product: {
            id: Key | null | undefined;
            images: any;
            name: string;
            price: number;
          }) => (
            <div key={product.id} className="grid-item">
              <h3 className="title">{product.name}</h3>
              <p className="price">{product.price} SEK</p>
              {product.images && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="image"
                />
              )}
            </div>
          )
        )}
      </div>
      <button onClick={() => navigate("/payment")}>Your Cart</button>
      <Logout />
    </div>
  );
};
