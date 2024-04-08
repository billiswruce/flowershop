import { useCart } from "../context/CartContext";
import "../styles/Header.css";

const CartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { cart } = useCart();

  return (
    <div className={isOpen ? "cart-modal" : "cart-modal cart-modal-hidden"}>
      <button onClick={onClose} className="close-btn">
        Close
      </button>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.product.id}>
            {item.product.name} - Antal: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartModal;
