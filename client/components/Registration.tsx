import { useState } from "react";

export const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      // Hantera framgångsrik registrering här (t.ex. visa meddelande eller omdirigera)
    } catch (error: any) {
      console.error("Registration error:", error);
      setErrorMessage(error.message || "Unknown error");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};
