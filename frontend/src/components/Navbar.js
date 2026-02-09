import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice"; // import logout from your slice

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());     // clears Redux state + localStorage
    navigate("/login");     // redirect to login page
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "40px 60px",
        backgroundColor: "#1a69b9",
        color: "white",
        fontSize: "32px",
        fontWeight: "bold",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <span>Asset Management System</span>
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          right: "40px",
          top: "50%",
          transform: "translateY(-50%)",
          padding: "8px 15px",
          backgroundColor: "white",
          color: "#4889cb",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </div>
  );
}
