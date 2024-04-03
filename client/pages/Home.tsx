import { useState, useEffect } from "react";
import { Registration } from "../components/Registration";
import { Login } from "../components/Login";
import { useNavigate } from "react-router-dom"; // Importera useNavigate från React Router

export const Home = () => {
  const [user, setUser] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate(); // Skapa en navigate-funktion med useNavigate

  const goToShopping = () => {
    navigate("/shopping"); // Funktion för att navigera till shopping-sidan
  };

  useEffect(() => {
    const authorize = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/authorize", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Server responded with a status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (error: any) {
        console.error("Authorization error:", error.message);
        setUser("");
      }
    };
    authorize();
  }, []);

  return (
    <div>
      <h1>{user ? `INLOGGAD ${user}` : "WELCOME TO POPPY BLOSSOMS"}</h1>
      {!user && (
        <>
          {isRegistering ? (
            <>
              <Registration />
              <button onClick={() => setIsRegistering(false)}>
                Tillbaka till login
              </button>
            </>
          ) : (
            <>
              <Login />
              <button onClick={() => setIsRegistering(true)}>Register</button>
            </>
          )}
        </>
      )}
      {user && (
        <button onClick={goToShopping}>Go to Shopping</button> // Knapp för att navigera till shopping-sidan när användaren är inloggad
      )}
    </div>
  );
};

export default Home;
