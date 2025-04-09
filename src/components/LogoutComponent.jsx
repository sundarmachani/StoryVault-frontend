import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function LogoutComponent() {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    authContext.Logout();
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [authContext, navigate]);

  return (
    <div className="logoutComponent">
      <h1>Logged out!</h1>
      <p>Thanks for sharing your daily stories. See you soon 🤗</p>
    </div>
  );
}
