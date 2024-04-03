import { useState, useEffect } from "react";
import { Registration } from "../components/Registration";
import { Login } from "../components/Login";

export const Home = () => {
  const [user, setUser] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState(false); // Nytt tillstånd för att hantera vy mellan registrering och login

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
      {/* {user && <button onClick={logout}>Logga ut</button>} */}
    </div>
  );
};

export default Home;
