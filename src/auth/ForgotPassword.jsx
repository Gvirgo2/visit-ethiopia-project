import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, loading, error, clearError } = useAuth();

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const result = await forgotPassword(email);

    if (result.success) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Check Your Email
          </h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Please check your email and click the link to reset your password.
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

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
      
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6 border border-white border-opacity-20"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Reset Password
          </h2>
          <p className="text-gray-600 mt-2">We'll send you a reset link</p>
        </div>

        <p className="text-gray-600 text-center">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:from-blue-400 hover:to-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword; 