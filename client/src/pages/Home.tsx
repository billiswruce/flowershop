import { useState, useEffect } from "react";
import { Registration } from "../components/Registration";
import { Login } from "../components/Login";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";

export const Home = () => {
  const [user, setUser] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const goToShopping = () => {
    navigate("/shopping");
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
      <h1>{user ? `INLOGGAD ${user}` : <img src={logo} alt="Logo" />}</h1>
      {!user && (
        <>
          {isRegistering ? (
            <>
              <Registration />
              <span
                className="link-like"
                onClick={() => setIsRegistering(false)}>
                Back to Login
              </span>
            </>
          ) : (
            <>
              <Login />
              <p>
                Need an account? Register{" "}
                <span
                  className="link-like"
                  onClick={() => setIsRegistering(true)}>
                  here
                </span>
                !
              </p>
            </>
          )}
        </>
      )}
      {user && <button onClick={goToShopping}>Go to Products</button>}
    </div>
  );
};

export default Home;
