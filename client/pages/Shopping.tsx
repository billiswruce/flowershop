import { useEffect, useState } from "react";
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
        // Antag att 'data' är direkt responsen du får från servern, som innehåller en lista med produkter.
        setProducts(data.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            {product.images && (
              <img
                src={product.images[0]}
                alt={product.name}
                style={{ width: "100px", height: "auto" }}
              />
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/payment")}>Your Cart</button>
      <Logout />
    </div>
  );
};
