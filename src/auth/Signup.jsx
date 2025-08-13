import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { signup, loading, error, clearError } = useAuth();

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
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errors.email = "Email is invalid";
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (!form.confirmPassword)
      errors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
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

    // Log the form data before sending
    console.log("Form data being sent:", form);

    const result = await signup(form);

    if (result.success) {
      alert("Signup successful! Please verify your email.");
      navigate("/login");
    } else {
      console.error("Signup failed:", result.error);
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
        onSubmit={handleSubmit}
        className="relative z-10 bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6 border border-white border-opacity-20"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🇪🇹</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Join TourMate
          </h2>
          <p className="text-gray-600 mt-2">Start your Ethiopian adventure</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formErrors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
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
            name="password"
            placeholder="Password"
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
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formErrors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-green-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:text-green-700">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
