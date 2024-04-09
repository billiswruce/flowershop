import { useCart } from "../context/CartContext";
import "../styles/Header.css";
import { FaTrash } from "react-icons/fa";

const CartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { cart, removeFromCart } = useCart();

  const totalCost = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const handlePayment = async () => {
    const cartForStripe = cart.map((item) => ({
      image: item.product.images[0],
      name: item.product.name,
      product: item.product.id,
      quantity: item.quantity,
    }));

    const response = await fetch(
      "http://localhost:3000/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(cartForStripe),
      }
    );
    const data = await response.json();

    if (response.ok) {
      console.log(data);
      localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
      window.location = data.url;
    } else {
      console.error("Failed to create checkout session", data);
    }
  };

  return (
    <div className={isOpen ? "cart-modal" : "cart-modal cart-modal-hidden"}>
      <button onClick={onClose} className="close-btn">
        Close
      </button>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.product.id}>
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="cart-item-image"
            />
            {item.product.name} - Amount: {item.quantity}
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="remove-item-btn">
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      <div className="total-cost">Total Cost: {totalCost} SEK</div>
      <div className="pay-btn-container">
        <button onClick={handlePayment} className="pay-btn">
          Let's pay!
        </button>
      </div>
    </div>
  );
};

export default CartModal;
