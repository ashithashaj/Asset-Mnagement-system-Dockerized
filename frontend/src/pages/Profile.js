import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <p style={{ padding: "20px", textAlign: "center" }}>Loading profile...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>

      <div style={styles.card}>
        {/* Profile Photo */}
        <div style={styles.avatarContainer}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            style={styles.avatar}
          />
          <button style={styles.changePicBtn}>Change Photo</button>
        </div>

        {/* User Details */}
        <div style={styles.details}>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> User
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "40px",
    color: "#2c3e50",
    borderBottom: "3px solid #5dade2",
    paddingBottom: "10px",
    width: "fit-content",
    textAlign: "center",
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    padding: "40px",
    borderRadius: "20px",
    width: "650px",
    maxWidth: "90%",
    backgroundColor: "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  avatar: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "4px solid #5dade2",
  },
  changePicBtn: {
    padding: "8px 15px",
    backgroundColor: "#5dade2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  details: {
    fontSize: "20px",
    color: "#34495e",
    lineHeight: "2",
  },
};

// Optional: Hover effect for the card
// Add this if you want hover effect dynamically
// styles.card[':hover'] = { transform: "translateY(-5px)", boxShadow: "0 12px 30px rgba(0,0,0,0.2)" };
