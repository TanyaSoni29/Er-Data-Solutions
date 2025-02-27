import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  refreshToken } from "../service/operations/authApi";	

const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const { isAuth, token, user, loading: authLoading } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true); // Internal loading state
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAuth = async () => {
      setLoading(true);

      try {
        // If the user is not authenticated but has a token, refresh or fetch user data
        if (!isAuth && token) {
          await dispatch(refreshToken()); // Refresh the token if needed
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [isAuth, token, dispatch]);

  if (authLoading || loading) {
    return <div>Loading...</div>; // Show loading screen during verification
  }

  if (!isAuth) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />; // Redirect if role is not allowed
  }

  return element; // Render the protected component
};

export default ProtectedRoute;
