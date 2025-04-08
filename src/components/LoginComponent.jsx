import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedMessage, setFailedMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const authContext = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    const success = await authContext.Login(username, password);
    setLoading(false);
    if (success) {
      navigate(`/welcome/${username}`);
    } else {
      setFailedMessage("Incorrect credentials. Please try again.");
    }
  };

  return (
    <div className="loginComponent">
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="loginButton">
        <button
          className="btn btn-success"
          type="button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {failedMessage && (
          <div className="failed m-3 alert alert-warning">{failedMessage}</div>
        )}
      </div>
    </div>
  );
}
