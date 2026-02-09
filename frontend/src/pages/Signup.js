// src/pages/Signup.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../features/authSlice";
import PublicNavbar from "../components/PublicNavbar";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        signupUser({ username, email, password })
      );

      if (signupUser.fulfilled.match(resultAction)) {
        alert("Signup successful! Please login.");
        navigate("/");
      } else {
        alert("Signup failed: " + JSON.stringify(resultAction.payload));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PublicNavbar />

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Signup</h2>

          <form onSubmit={handleSignup} style={styles.form}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Signup
            </button>
          </form>

          <p style={styles.loginText}>
            Already have an account?{" "}
            <Link to="/" style={styles.loginLink}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "30vh",
    background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    width: "400px",
    maxWidth: "90%",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "30px",
    color: "#2c3e50",
    borderBottom: "2px solid #f5a623",
    paddingBottom: "10px",
    width: "fit-content",
    margin: "0 auto 30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#f5a623",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  loginText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#34495e",
  },
  loginLink: {
    color: "#f5a623",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
