import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user:", e);
        localStorage.removeItem("authUser");
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    setError(null);

    // Mock authentication - in real app, call API
    const mockUsers = [
      {
        id: "1",
        email: "teerapat.j@gmail.aaa",
        password: "password123",
        fullName: "คุณธีรภัทร เจริญวงศ์",
        phone: "089-555-1122",
        address: "89 ซอยเพชรเกษม",
        subDistrict: "แขวงหนองค้างพลู",
        district: "เขตหนองแขม",
        province: "กรุงเทพ",
        postalCode: "10110",
      },
      {
        id: "2",
        email: "demo@example.com",
        password: "demo123",
        fullName: "Demo User",
        phone: "02-888-9988",
        address: "123 Demo Street",
        subDistrict: "Demo Sub",
        district: "Demo District",
        province: "Demo Province",
        postalCode: "10001",
      },
    ];

    let foundUser = mockUsers.find((u) => u.email === email && u.password === password);

    // If not found in mock data, check if the user registered and was saved in localStorage
    if (!foundUser) {
      const storedUserJSON = localStorage.getItem(`user_${email}`);
      if (storedUserJSON) {
        try {
          const storedUser = JSON.parse(storedUserJSON);
          if (storedUser.password === password) {
            foundUser = storedUser;
          }
        } catch (e) {
          console.error("Failed to parse stored user during login:", e);
        }
      }
    }

    if (!foundUser) {
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      return false;
    }

    // Remove password from stored user
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem("authUser", JSON.stringify(userWithoutPassword));
    return true;
  };

  // Register function
  const register = (userData) => {
    setError(null);

    // Check if email already exists
    const existingUser = localStorage.getItem(`user_${userData.email}`);
    if (existingUser) {
      setError("อีเมลนี้ถูกใช้ลงทะเบียนแล้ว");
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      password: userData.password,
      fullName: userData.fullName,
      phone: userData.phone,
      address: userData.address || "",
      subDistrict: userData.subDistrict || "",
      district: userData.district || "",
      province: userData.province || "",
      postalCode: userData.postalCode || "",
    };

    // Store new user (in real app would be backend)
    localStorage.setItem(`user_${userData.email}`, JSON.stringify(newUser));

    // Auto-login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("authUser", JSON.stringify(userWithoutPassword));
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("aaa_omega_cart"); // Clear cart from storage
    setError(null);
  };

  // Update profile function
  const updateProfile = (updatedData) => {
    if (!user) {
      setError("ไม่มีผู้ใช้ที่ login");
      return false;
    }

    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("authUser", JSON.stringify(updatedUser));
    return true;
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