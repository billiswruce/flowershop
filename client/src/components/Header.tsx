import { useState } from "react"; // Lägg till useState
import { useCart } from "../context/CartContext";
import { BsCart2 } from "react-icons/bs";
import Logout from "./Logout";
import "../styles/Header.css";
import OrderModal from "./OrderModal";

const Header = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const { cart } = useCart();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false); // Ny stat för OrderModal

  return (
    <div className="header">
      <Logout />
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
      <button onClick={() => setIsOrderModalOpen(true)}>Orders</button>{" "}
      <div className="cart" onClick={() => setIsModalOpen(true)}>
        <BsCart2 size="2rem" />
        <p>{cart.length}</p>
      </div>
    </div>
  );
};

export default Header;
