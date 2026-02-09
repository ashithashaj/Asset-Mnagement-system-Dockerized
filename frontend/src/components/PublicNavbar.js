// src/components/PublicNavbar.js
import React from "react";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          Asset Management System
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    width: "100%",
    padding: "40px 0",
    backgroundColor: "#4a90e2", // New shade: soft blue
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    marginBottom: "40px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#fff", // White text looks nice on blue
    textDecoration: "none",
    letterSpacing: "1px",
  },
};
