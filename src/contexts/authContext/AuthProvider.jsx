import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const API_URL = "http://localhost:8888/api/v1/users";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage and verify token
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          // If we have a token, fetch the user profile to verify it's still valid
          const response = await axios.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.data); // Assuming backend returns user inside `data`
        } catch (e) {
          console.error("Token invalid or expired:", e);
          localStorage.removeItem("authUser");
          localStorage.removeItem("authToken");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      // Depending on exact backend response structure, usually token and user are returned
      // Let's assume response.data has { token, data: user } or something similar
      const { token, data: userData } = response.data;

      setUser(userData || response.data.user); 
      localStorage.setItem("authUser", JSON.stringify(userData || response.data.user));
      localStorage.setItem("authToken", token);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      return false;
    }
  };

  // Register function
  const register = async (userData) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      
      const { token, data: newUserData } = response.data;

      setUser(newUserData || response.data.user);
      localStorage.setItem("authUser", JSON.stringify(newUserData || response.data.user));
      if (token) localStorage.setItem("authToken", token);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || "เกิดข้อผิดพลาดในการลงทะเบียน");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    // Optional: call backend logout endpoint if it exists and requires token revocation
    // axios.post(`${API_URL}/logout`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }});
    
    setUser(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    setError(null);
  };

  // Update profile function
  const updateProfile = async (updatedData) => {
    if (!user) {
      setError("ไม่มีผู้ใช้ที่ login");
      return false;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(`${API_URL}/profile`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedUser = response.data.data || response.data.user;
      setUser(updatedUser);
      localStorage.setItem("authUser", JSON.stringify(updatedUser));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || "อัปเดตข้อมูลไม่สำเร็จ");
      return false;
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

//note