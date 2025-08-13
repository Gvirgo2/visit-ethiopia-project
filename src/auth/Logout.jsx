import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate("/login");
    };
    performLogout();
  }, [navigate, logout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="text-red-700 text-xl">Logging out...</div>
    </div>
  );
};

export default Logout;
