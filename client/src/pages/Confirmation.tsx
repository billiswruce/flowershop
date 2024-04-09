import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import thankYouImage from "../img/confirm2.jpg";
import "../styles/Confirmation.css";

export const Confirmation = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!verified) {
      console.log("nu körs jag");

      const verifySession = async () => {
        try {
          let sessionId;
          const dataFromLs = localStorage.getItem("sessionId");

          console.log("Data from localStorage:", dataFromLs);

          if (dataFromLs) {
            sessionId = JSON.parse(dataFromLs);
          }

          const response = await fetch(
            "http://localhost:3000/payments/verify-session",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ sessionId }),
            }
          );

          const data = await response.json();

          if (response.ok) {
            setVerified(data.verified);
            setIsLoading(false);
          } else {
            console.error("Error verifying session:", data);
          }
        } catch (error) {
          console.error("Error verifying session:", error);
        }
      };

      verifySession();
    }
  }, [verified]);

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
