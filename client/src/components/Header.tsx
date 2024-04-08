import { useCart } from "../context/CartContext";
import { BsCart2 } from "react-icons/bs";
import Logout from "./Logout";
import "../styles/Header.css";

const Header = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const { cart } = useCart();

  return (
    <div className="header">
      <Logout />
      <div className="cart" onClick={() => setIsModalOpen(true)}>
        <BsCart2 size="2rem" />
        <p>{cart.length}</p>
      </div>
    </div>
  );
};

export default Header;
