import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (!confirmLogout) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <button onClick={handleLogout}>Log out</button>;
};

export default Logout;
