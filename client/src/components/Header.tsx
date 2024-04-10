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

  // Beräkna den totala kvantiteten av alla produkter i varukorgen
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="header">
      <Logout />
      <div>{user.email}</div>
      {/* <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
      /> */}
      {/* <button onClick={() => setIsOrderModalOpen(true)}>Orders</button>{" "} */}
      <div className="cart" onClick={() => setIsModalOpen(true)}>
        <BsCart2 size="2rem" />
        <p>{totalItems}</p> {/* Visar den totala kvantiteten av produkter */}
      </div>
    </div>
  );
};

export default Header;
