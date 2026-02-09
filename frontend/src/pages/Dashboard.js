import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", flex: 1, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Asset Management Dashboard</h1>
      <p style={{ textAlign: "center", color: "#34495e" }}>Welcome! You are logged in.</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "40px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{ ...cardStyle, background: "#d1f0d1" }}
          onClick={() => navigate("/assets")}
        >
          <h3 style={{ color: "#1e8449" }}>Assets</h3>
          <p style={{ color: "#145a32" }}>Manage company assets</p>
        </div>

        <div
          style={{ ...cardStyle, background: "#d1e0f0" }}
          onClick={() => navigate("/inventory")}
        >
          <h3 style={{ color: "#1a5276" }}>Inventory</h3>
          <p style={{ color: "#154360" }}>Track inventory items</p>
        </div>

        <div
          style={{ ...cardStyle, background: "#f0d1d1" }}
          onClick={() => navigate("/tickets")}
        >
          <h3 style={{ color: "#922b21" }}>Tickets</h3>
          <p style={{ color: "#641e16" }}>Support & issues</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  width: "200px",
  borderRadius: "8px",
  cursor: "pointer",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  transition: "transform 0.2s, box-shadow 0.2s",
};

// Add hover effect globally with inline style
// You can also create a CSS class if preferred
cardStyle[':hover'] = {
  transform: "translateY(-5px)",
  boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
};
