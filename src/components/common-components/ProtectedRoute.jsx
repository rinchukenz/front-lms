import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth, studentAuth, loading } = useAuth();

  if (loading) return null;

  const isAuthorized =
    (auth.isLoggedIn && allowedRoles.includes(auth.role)) ||
    (studentAuth.token && allowedRoles.includes("USER"));

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
