import { useCart } from "../context/CartContext";
import { BsCart2 } from "react-icons/bs";
import Logout from "./Logout";
import "../styles/Header.css";
// import OrderModal from "./OrderModal";

const Header = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const { cart, user } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="header">
      <Logout />
      <div className="header-email">{user.email}</div>
      {/* <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
      /> */}
      {/* <button onClick={() => setIsOrderModalOpen(true)}>Orders</button>{" "} */}
      <div className="cart" onClick={() => setIsModalOpen(true)}>
        <BsCart2 size="2rem" />
        <p>{totalItems}</p>
      </div>
    </div>
  );
};

export default Header;
