import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword, loading, error, clearError } = useAuth();

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (!form.passwordConfirm) {
      errors.passwordConfirm = "Please confirm your password";
    } else if (form.password !== form.passwordConfirm) {
      errors.passwordConfirm = "Passwords do not match";
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

    const result = await resetPassword(token, {
      password: form.password,
      passwordConfirm: form.passwordConfirm,
    });

    if (result.success) {
      setIsSubmitted(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Password Reset Successful
          </h2>
          <p className="text-gray-600 mb-6">
            Your password has been successfully reset.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to login page in 3 seconds...
          </p>
          <Link
            to="/login"
            className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors mt-4"
          >
            Go to Login Now
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
            Set New Password
          </h2>
          <p className="text-gray-600 mt-2">Choose a secure password</p>
        </div>

        <p className="text-gray-600 text-center">
          Enter your new password below.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formErrors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm New Password"
            value={form.passwordConfirm}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formErrors.passwordConfirm ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.passwordConfirm && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.passwordConfirm}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-green-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="text-green-600 hover:text-green-700">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword; 