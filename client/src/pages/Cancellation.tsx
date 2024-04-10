import { useNavigate } from "react-router-dom";
import "../styles/Confirmation.css";
import cancelimg from "../img/cancel2.jpg";

export const Cancellation = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <button
        onClick={() => navigate("/shopping")}
        className="back-to-shop-btn">
        Go back to Products
      </button>
      <h3>Your order is cancelled, hope you change your mind!</h3>
      <img
        src={cancelimg}
        alt="Order cancelled"
        className="cancellation-image"
      />
    </div>
  );
};
