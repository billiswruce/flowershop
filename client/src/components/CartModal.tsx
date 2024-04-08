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
  const { cart, removeFromCart } = useCart(); // Använd removeFromCart från useCart

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
    </div>
  );
};

export default CartModal;
