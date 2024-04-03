import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout"; // Import the 'Logout' component

export const Shopping = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={() => navigate("/payment")}>Your Cart</button>
      <Logout />
    </div>
  );
};
