import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(`/api/v1/users/verify/${token}`);
        setStatus("success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        setStatus("error");
        console.error("Verification error:", err);
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ethiopian-themed background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-yellow-600 to-red-800"></div>
      
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Floating Ethiopian elements */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce">🏔️</div>
      <div className="absolute top-20 right-20 text-5xl animate-pulse">☕</div>
      <div className="absolute bottom-20 left-20 text-5xl animate-bounce">🏛️</div>
      <div className="absolute bottom-10 right-10 text-6xl animate-pulse">🌿</div>
      
      <div className="relative z-10 bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-md text-center border border-white border-opacity-20">
        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📧</span>
        </div>
        
        {status === "verifying" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Email</h2>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </div>
        )}
        {status === "success" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Verified!</h2>
            <p className="text-gray-600">Your email has been successfully verified. Redirecting to login...</p>
          </div>
        )}
        {status === "error" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h2>
            <p className="text-gray-600">Please try again or contact support for assistance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
