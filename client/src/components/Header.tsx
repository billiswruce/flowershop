import { useCart } from "../context/CartContext";
import { BsCart2 } from "react-icons/bs";
import Logout from "./Logout";
import "../styles/Header.css"; // Glöm inte att importera din CSS här
// import { useNavigate } from "react-router-dom";

const Header = () => {
  const { cart } = useCart();
  // const navigate = useNavigate();

  return (
    <div className="header">
      <Logout />
      <div className="cart">
        <BsCart2 size="2rem" />
        <p>{cart.length}</p>
      </div>

      {/* <button onClick={() => navigate("/payment")}>Your Cart</button> */}
    </div>
  );
};

export default Header;
