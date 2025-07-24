import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { auth, loading } = useAuth();

//   if (loading) return null; // or return a loading spinner

//   if (!auth.isLoggedIn || (allowedRoles && !allowedRoles.includes(auth.role))) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />; // this will render nested routes
// };

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth, studentAuth, loading } = useAuth();

  if (loading) return null;

  // Check both admin/instructor and student auth
  const isAuthorized =
    (auth.isLoggedIn && allowedRoles.includes(auth.role)) ||
    (studentAuth.token && allowedRoles.includes("USER"));

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
