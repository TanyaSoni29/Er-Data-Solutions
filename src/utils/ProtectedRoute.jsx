import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "../service/operations/authApi";

const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const { isAuth, loading, token, user } = useSelector((state) => state.auth);

  // Re-authenticate user if token exists but `isAuth` is false
  useEffect(() => {
    if (token && !isAuth) {
      dispatch(getMe());
    }
  }, [token, isAuth]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while fetching user details
  }

  if (!isAuth) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />; // Redirect if user role is not allowed
  }

  return element; // Render the protected component
};

export default ProtectedRoute;
