import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import logo from "../img/logo.png";

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
        console.log("Fetched products:", data);
        setProducts(data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="shopping-container">
      <img src={logo} alt="Logo" className="logo" />
      <div className="grid-container">
        {products.map(
          (product: {
            id: Key | null | undefined;
            images: any;
            name: string;
            price: number;
          }) => (
            <div key={product.id} className="grid-item">
              {product.images && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="image"
                />
              )}
              <h3 className="title">{product.name}</h3>
              <p className="price">{product.price} SEK</p>
            </div>
          )
        )}
      </div>
      <button onClick={() => navigate("/payment")}>Your Cart</button>
      <Logout />
    </div>
  );
};
