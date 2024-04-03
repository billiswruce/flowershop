import { useState, useEffect } from "react";
import { Registration } from "../components/Registration";
import { Login } from "../components/Login";

export const Home = () => {
  const [user, setUser] = useState<string>("");

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

  // const login = async () => {
  //   const response = await fetch("http://localhost:3000/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({
  //       email: "",
  //       password: "",
  //     }),
  //   });
  //   const data = await response.json();
  //   if (response.status === 200) {
  //     setUser(data);
  //   } else {
  //     setUser("");
  //   }
  // };

  const logout = async () => {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.status === 200) {
      setUser("");
    }
  };

  return (
    <div>
      <h1>{user ? `INLOGGAD ${user}` : "UTLOGGAD"}</h1>
      {!user && (
        <>
          <Registration />
          <Login />
        </>
      )}
      {user && <button onClick={logout}>Log Out</button>}
      <a href="/payment">
        <button>Go to Payments</button>
      </a>
    </div>
  );
};

export default Home;

//RAFCE kortkommando för att få fram basic template för en funktionell komponent
