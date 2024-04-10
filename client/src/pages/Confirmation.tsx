import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Glöm inte att importera useCart
import thankYouImage from "../img/confirm2.jpg";
import "../styles/Confirmation.css";

export const Confirmation = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { clearCart } = useCart(); // Hämta clearCartAndUser från useCart

  useEffect(() => {
    const verifySession = async () => {
      try {
        let sessionId;
        const dataFromLs = localStorage.getItem("sessionId");
        if (dataFromLs) {
          sessionId = JSON.parse(dataFromLs);
        }

        const response = await fetch(
          "http://localhost:3000/payments/verify-session",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          }
        );

        const data = await response.json();

        if (response.ok && data.verified) {
          setVerified(true);
          setIsLoading(false);
          clearCart();
          localStorage.removeItem("sessionId");
        } else {
          console.error("Error verifying session:", data);
        }
      } catch (error) {
        console.error("Error verifying session:", error);
      }
    };

    if (!verified) {
      verifySession();
    }
  }, [verified, clearCart]);

  const goBackToShop = () => {
    navigate("/shopping");
  };

  return (
    <div className="confirmation-container">
      <button onClick={goBackToShop} className="back-to-shop-btn">
        Go back to shop
      </button>
      {verified && !isLoading ? (
        <>
          <h3>Thank you for your order!</h3>
          <img
            src={thankYouImage}
            alt="Thank you for your order"
            className="confirmation-image"
          />
        </>
      ) : (
        <h3>LOADING...</h3>
      )}
    </div>
  );
};
