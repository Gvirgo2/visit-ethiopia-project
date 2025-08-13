import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuth();

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const result = await login(email, password);

    if (result.success) {
      navigate("/dashboard"); // This will now show the Hero page
    }
  };

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
        onSubmit={handleLogin}
        className="relative z-10 bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6 border border-white border-opacity-20"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🇪🇹</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-gray-600 mt-2">Sign in to explore Ethiopia</p>
        </div>

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

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border rounded ${
              formErrors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-600 hover:text-orange-700"
            >
              Sign up
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link
              to="/forgot-password"
              className="text-orange-600 hover:text-orange-700"
            >
              Forgot your password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
