import { useEffect, useState } from "react";
import logo from "../img/logo.png";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import CartModal from "../components/CartModal";
import "../styles/Shopping.css";

export const Shopping = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

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
    <>
      <Header setIsModalOpen={setIsModalOpen} />
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="shopping-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="grid-container">
          {products.map(
            (product: {
              id: string;
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
                <button onClick={() => addToCart(product)} className="shop-btn">
                  Add to Cart
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
