import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h3>
        {verified && !isLoading ? "THANK YOU FOR YOUR ORDER!" : "LOADING..."}
        <button onClick={goBackToShop}>Go back to shop</button>
      </h3>
    </div>
  );
};
