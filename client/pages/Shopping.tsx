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
        setProducts(data.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="shopping-container">
      <h1 className="welcome">Welcome!</h1>
      <div className="grid-container">
        {products.map(
          (product: {
            id: Key | null | undefined;
            images: any;
            name: string;
          }) => (
            <div key={product.id} className="grid-item">
              <h3 className="title">{product.name}</h3>

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
