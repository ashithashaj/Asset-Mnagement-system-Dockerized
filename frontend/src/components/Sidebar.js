import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.heading}>Menu</h2>
      <ul style={styles.menu}>
        <li>
          <NavLink
            to="/dashboard"
            style={({ isActive }) =>
              isActive
                ? { ...styles.link, ...styles.activeLink }
                : styles.link
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            style={({ isActive }) =>
              isActive
                ? { ...styles.link, ...styles.activeLink }
                : styles.link
            }
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/assets"
            style={({ isActive }) =>
              isActive
                ? { ...styles.link, ...styles.activeLink }
                : styles.link
            }
          >
            Assets
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/inventory"
            style={({ isActive }) =>
              isActive
                ? { ...styles.link, ...styles.activeLink }
                : styles.link
            }
          >
            Inventory
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tickets"
            style={({ isActive }) =>
              isActive
                ? { ...styles.link, ...styles.activeLink }
                : styles.link
            }
          >
            Tickets
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    backgroundColor: "#e7ed9b",
    height: "100vh",
    padding: "20px",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
    borderBottom: "2px solid #c0c0c0",
    paddingBottom: "10px",
    textAlign: "left", // Heading aligned left
  },
  menu: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    display: "block",
    padding: "10px 15px",
    color: "#333",
    textDecoration: "none",
    fontWeight: "500",
    borderRadius: "5px",
    marginBottom: "10px",
    transition: "all 0.2s",
  },
  activeLink: {
    backgroundColor: "#d7b4b9", // Light green for active link
    color: "#000",
  },
};
