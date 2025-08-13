import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const UpdatePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { updatePassword, loading, error, clearError } = useAuth();

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
    if (!form.currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    if (!form.newPassword) {
      errors.newPassword = "New password is required";
    } else if (form.newPassword.length < 8) {
      errors.newPassword = "New password must be at least 8 characters";
    }
    if (!form.newPasswordConfirm) {
      errors.newPasswordConfirm = "Please confirm your new password";
    } else if (form.newPassword !== form.newPasswordConfirm) {
      errors.newPasswordConfirm = "New passwords do not match";
    }
    if (form.currentPassword === form.newPassword) {
      errors.newPassword = "New password must be different from current password";
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

    const result = await updatePassword({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
      newPasswordConfirm: form.newPasswordConfirm,
    });

    if (result.success) {
      setIsSubmitted(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Password Updated Successfully
          </h2>
          <p className="text-gray-600 mb-6">
            Your password has been successfully updated.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to dashboard in 3 seconds...
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors mt-4"
          >
            Go to Dashboard Now
          </button>
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
            Update Password
          </h2>
          <p className="text-gray-600 mt-2">Keep your account secure</p>
        </div>

        <p className="text-gray-600 text-center">
          Enter your current password and choose a new password.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formErrors.currentPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.currentPassword}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formErrors.newPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{formErrors.newPassword}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="newPasswordConfirm"
            placeholder="Confirm New Password"
            value={form.newPasswordConfirm}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              formErrors.newPasswordConfirm ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.newPasswordConfirm && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.newPasswordConfirm}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword; 