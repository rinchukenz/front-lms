import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const logoutTimeoutRef = useRef(null);

  const [auth, setAuth] = useState({
    isLoggedIn: false,
    user: null,
    adminId: null,
    role: null,
    token: null,
    name: null,
    organizationId: null,
    organizationName: null,
  });

  const [studentAuth, setStudentAuth] = useState({
    token: null,
    email: null,
    name: null,
    refreshToken: null,
  });

  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("refreshToken");

    setAuth({
      isLoggedIn: false,
      user: null,
      adminId: null,
      role: null,
      token: null,
      name: null,
      organizationId: null,
      organizationName: null,
    });

    setStudentAuth({
      token: null,
      email: null,
      name: null,
      refreshToken: null,
    });

    if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);

    //navigate("/");
  };

  const scheduleLogout = (exp) => {
    if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);

    const remainingTime = exp * 1000 - Date.now();
    if (remainingTime > 0) {
      logoutTimeoutRef.current = setTimeout(() => {
        logout();
      }, remainingTime);
    } else {
      logout(); // Expired immediately
    }
  };

  const refreshStudentToken = async () => {
    const email = localStorage.getItem("email");
    const oldRefreshToken = localStorage.getItem("refreshToken");

    if (!email || !oldRefreshToken) {
      logout();
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/refresh-token",
        { email, refreshToken: oldRefreshToken }
      );

      const { token, refreshToken: newRefreshToken, name } = response.data;

      if (!token || typeof token !== "string") {
        console.error("Invalid token received");
        logout();
        return;
      }

      const decoded = jwtDecode(token);

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", newRefreshToken);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      setStudentAuth({
        token,
        email,
        name,
        refreshToken: newRefreshToken,
      });

      scheduleLogout(decoded.exp);
    } catch (err) {
      console.error("Failed to refresh token:", err);
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && typeof token === "string") {
      try {
        const decoded = jwtDecode(token);
        const {
          exp,
          sub: user,
          id: adminId,
          role,
          name,
          organizationId,
          organizationName,
        } = decoded;

        const isExpired = Date.now() >= exp * 1000;

        if (!isExpired) {
          if (role === "USER") {
            setStudentAuth({
              token,
              email: user,
              name: localStorage.getItem("name") || null,
              refreshToken: localStorage.getItem("refreshToken") || null,
            });
          } else {
            setAuth({
              isLoggedIn: true,
              user,
              adminId,
              role,
              token,
              name,
              organizationId,
              organizationName,
            });
          }

          scheduleLogout(exp);
        } else if (role === "USER") {
          refreshStudentToken();
        } else {
          logout();
        }
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    } else {
      logout();
    }

    setLoading(false);

    return () => {
      if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        studentAuth,
        setStudentAuth,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
