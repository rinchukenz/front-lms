import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    isLoggedIn: false,
    user: null,
    role: null,
    token: null,
  });

  const [loading, setLoading] = useState(true); // 🆕 loading state

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const { exp, sub: user, role } = decoded;

        if (Date.now() < exp * 1000) {
          setAuth({
            isLoggedIn: true,
            user,
            role,
            token,
          });

          const remainingTime = exp * 1000 - Date.now();
          setTimeout(() => {
            logout();
          }, remainingTime);
        } else {
          logout();
        }
      } catch (err) {
        console.error("Invalid token");
        logout();
      }
    }

    setLoading(false); // ✅ done loading
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      isLoggedIn: false,
      user: null,
      role: null,
      token: null,
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
