import { useNavigate } from "react-router-dom";

export const Cancellation = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Your order is cancelled, hope you change your mind!</h1>
      <button onClick={() => navigate("/shopping")}>Go back to Products</button>
    </div>
  );
};
