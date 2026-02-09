// src/components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div>
      {/* Full width Navbar */}
      <Navbar />

      <div style={styles.container}>
        {/* Sidebar on left */}
        <Sidebar />

        {/* Main content area */}
        <div style={styles.content}>
          <Outlet /> {/* Renders Dashboard/Profile/Assets etc. */}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f1f1f1",
  },
};
