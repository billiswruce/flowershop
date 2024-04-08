import { useState } from "react";
import "../styles/Registration.css";

export const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      setSuccessMessage("Registration was successful! Welcome!");
      setErrorMessage("");
    } catch (error: any) {
      console.error("Registration error:", error);
      setErrorMessage(error.message || "Unknown error");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}{" "}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister} className="btn-register2">
        Register
      </button>
    </div>
  );
};
