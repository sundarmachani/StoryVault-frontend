// RegisterComponent.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserApi } from "./api/DiaryApiService";

export default function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validate email using a basic regex
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate password strength: at least 8 characters, one uppercase, one lowercase, one digit, and one special character.
  const isStrongPassword = (password) => {
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/.test(
      password
    );
  };

  const handleRegister = async () => {
    setErrorMessage("");

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isStrongPassword(password)) {
      setErrorMessage(
        "Password is too weak. It must be at least 8 characters long and include one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    setLoading(true);
    try {
      // Call the registration API; note that the backend now treats the username as an email.
      await registerUserApi(email, password);
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        // If the server sent a specific error message, display it
        setErrorMessage(error.response.data);
      } else {
        // Fallback for unexpected errors or no message
        setErrorMessage("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerComponent container">
      <h1>Register</h1>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />
      </div>
      {errorMessage && (
        <div className="alert alert-warning">{errorMessage}</div>
      )}
      <button
        className="btn btn-success"
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
}
