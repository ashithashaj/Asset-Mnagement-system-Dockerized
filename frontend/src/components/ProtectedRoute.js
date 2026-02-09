import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  // If no user in Redux, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If children provided, render them; otherwise render Outlet for nested routes
  return children || <Outlet />;
}
