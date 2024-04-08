import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importera useNavigate
import "../styles/Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Använd useNavigate hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Rensa tidigare felmeddelanden

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(
          `Login failed: ${response.status} ${response.statusText}`
        );
      }

      // Om inloggningen lyckades, använd navigate för att omdirigera
      navigate("/shopping"); // Omdirigera till /payment
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome! Please log in :)</h2>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
};
