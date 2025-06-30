import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth, loading } = useAuth();

  if (loading) return null; // or return a loading spinner

  if (!auth.isLoggedIn || (allowedRoles && !allowedRoles.includes(auth.role))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // this will render nested routes
};

export default ProtectedRoute;
