import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Check if user is authenticated on app load
  const checkAuth = useCallback(async () => {
    // Prevent multiple simultaneous auth checks
    if (loading || authChecked) return;

    try {
      setLoading(true);
      setError(null);

      // Check if we have stored authentication data first
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        // Verify token with backend
        try {
          const response = await axios.get("/api/v1/users/me");
          console.log("Auth verification response:", response.data);

          if (response.data.status === "success" || response.data.user) {
            const userData = response.data.data?.user || response.data.user || JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
            
            // Update stored user data if needed
            if (userData !== JSON.parse(storedUser)) {
              localStorage.setItem("user", JSON.stringify(userData));
            }
          } else {
            // Invalid token, clear storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          // Clear invalid token
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        // No stored data, user is not authenticated
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      // Clear any stored data on error
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  }, [loading, authChecked]);

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("/api/v1/users/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      // Handle different response formats
      const responseData = response.data;
      const token = responseData.token || responseData.data?.token;
      const userData = responseData.data?.user || responseData.user;

      if (token) {
        localStorage.setItem("token", token);
        // Update axios default headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      } else {
        // Create basic user object if not provided
        const basicUser = {
          name: email.split('@')[0],
          email: email,
          role: "user",
        };
        localStorage.setItem("user", JSON.stringify(basicUser));
        setUser(basicUser);
      }

      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Signup function
  const signup = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);

      // Ensure the data format matches exactly what the backend expects
      const signupData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        passwordConfirm: userData.confirmPassword,
        role: userData.role || "user",
      };

      console.log("Sending signup data:", signupData);

      const response = await axios.post("/api/v1/users/signup", signupData);

      console.log("Signup response:", response.data);

      return { success: true };
    } catch (error) {
      console.error("Signup error details:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Signup failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Try to call logout endpoint
      await axios.post("/api/v1/users/logout");
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with local logout even if API call fails
    } finally {
      // Clear local storage and state
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      // Clear axios default headers
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  // Forgot password function
  const forgotPassword = useCallback(async (email) => {
    try {
      setLoading(true);
      setError(null);

      await axios.post("/api/v1/users/forgotPassword", { email });

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 
        error.response?.data?.error ||
        error.message ||
        "Failed to send reset email";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset password function
  const resetPassword = useCallback(async (token, passwordData) => {
    try {
      setLoading(true);
      setError(null);

      const resetData = {
        password: passwordData.password,
        passwordConfirm: passwordData.passwordConfirm,
      };

      console.log("Sending reset password data:", resetData);

      const response = await axios.patch(
        `/api/v1/users/resetPassword/${token}`,
        resetData
      );

      console.log("Reset password response:", response.data);

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Reset password error:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || 
        error.response?.data?.error ||
        error.message ||
        "Password reset failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update logged-in user's password function
  const updatePassword = useCallback(async (passwordData) => {
    try {
      setLoading(true);
      setError(null);

      const updateData = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        newPasswordConfirm: passwordData.newPasswordConfirm,
      };

      console.log("Sending update password data:", updateData);

      const response = await axios.patch(
        "/api/v1/users/updatePassword",
        updateData
      );

      console.log("Update password response:", response.data);

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Update password error:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || 
        error.response?.data?.error ||
        error.message ||
        "Password update failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (!authChecked) {
      // Add a small delay to prevent rapid re-renders
      const timer = setTimeout(() => {
        checkAuth();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [checkAuth, authChecked]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      error,
      login,
      signup,
      logout,
      forgotPassword,
      resetPassword,
      updatePassword,
      clearError,
    }),
    [
      user,
      isAuthenticated,
      loading,
      error,
      login,
      signup,
      logout,
      forgotPassword,
      resetPassword,
      updatePassword,
      clearError,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-yellow-600 to-red-800">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
              <span className="text-2xl">🇪🇹</span>
            </div>
            <div className="text-white text-lg font-semibold">
              Loading TourMate...
            </div>
            <div className="text-white text-sm mt-2">
              Connecting to Ethiopia
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
