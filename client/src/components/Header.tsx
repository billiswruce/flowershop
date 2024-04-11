import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { BsCart2 } from "react-icons/bs";
import Logout from "./Logout";
import "../styles/Header.css";

const Header = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const { cart, user, setUser } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  useEffect(() => {
    // Hämta användarens e-postadress från localStorage när komponenten mountas eller uppdateras
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setUser({ email: userEmail });
    }
  }, [setUser]);

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
