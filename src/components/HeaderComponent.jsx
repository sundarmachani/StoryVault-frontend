// HeaderComponent.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function HeaderComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const welcomeUrl = `/welcome/${authContext.username}`;

  const handleLogout = () => {
    authContext.Logout();
  };

  return (
    <header className="headerComponent">
      <div className="container">
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            Story Vault
          </Link>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={welcomeUrl}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/entries">
                    Entries
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
