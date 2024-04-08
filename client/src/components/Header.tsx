import { useCart } from "../context/CartContext";
import { BsCart2 } from "react-icons/bs";
import Logout from "./Logout";

const Header = () => {
  const { cart } = useCart();

  return (
    <div className="header">
      <div className="cart">
        <BsCart2 />
        <p>{cart.length}</p>
      </div>
      <Logout />
    </div>
  );
};

export default Header;
