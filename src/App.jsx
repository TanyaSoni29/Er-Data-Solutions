import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./service/operations/authApi";
import ProtectedRoute from "./utils/ProtectedRoute";
import "./App.css";
import LoginForm from "./components/Authentication/LoginForm";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Request from "./pages/Request";
import ForgotPassword from "./components/Authentication/ForgetPassword";
import Dashboard1 from "./pages/Dashboard1";
import Dashboard2 from "./pages/Dashboard2";
import Profiles from "./pages/Profiles";
import RequestUser from "./pages/RequestUser";
import AddUserSecond from "./pages/AddUserSecond";

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Fetch user info on app load if token is available
  useEffect(() => {
    if (token) {
      dispatch(getMe(navigate));
    }
  }, [dispatch, token]);

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard />}
              allowedRoles={["1"]} // Only role 1 can access
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard1 />}
              allowedRoles={["2"]} // Only role 2 can access
            />
          }
        />
        <Route
          path="/dashboard-1"
          element={
            <ProtectedRoute
              element={<Dashboard2 />}
              allowedRoles={["2"]} // Only role 2 can access
            />
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute
              element={<Users />}
              allowedRoles={["1"]} // Only role 1 can access
            />
          }
        />
        <Route
          path="/users/addUser"
          element={
            <ProtectedRoute
              element={<AddUserSecond />}
              allowedRoles={["1"]} // Only role 1 can access
            />
          }
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute
              element={<Profiles />}
              allowedRoles={["1", "2"]} // Both roles 1 and 2 can access
            />
          }
        />
        <Route
          path="/requests"
          element={
            <ProtectedRoute
              element={<Request />}
              allowedRoles={["1", "2"]} // Both roles 1 and 2 can access
            />
          }
        />
        <Route
          path="/requestsList"
          element={
            <ProtectedRoute
              element={<RequestUser />}
              allowedRoles={["1", "2"]} // Both roles 1 and 2 can access
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
