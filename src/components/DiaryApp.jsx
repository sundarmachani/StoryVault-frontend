// DiaryApp.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./security/AuthContext";
import HeaderComponent from "./HeaderComponent";

// Lazy load components
const LoginComponent = lazy(() => import("./LoginComponent"));
const RegisterComponent = lazy(() => import("./RegisterComponent"));
const WelcomeComponent = lazy(() => import("./WelcomeComponent"));
const ListEntriesComponent = lazy(() => import("./ListEntriesComponent"));
const EntryComponent = lazy(() => import("./EntryComponent"));
const LogoutComponent = lazy(() => import("./LogoutComponent"));
const ErrorComponent = lazy(() => import("./ErrorComponent"));

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  return authContext.isAuthenticated ? children : <Navigate to="/login" />;
}

export default function DiaryApp() {
  return (
    <div className="DiaryApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<LoginComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/register" element={<RegisterComponent />} />
              <Route
                path="/welcome/:username"
                element={
                  <AuthenticatedRoute>
                    <WelcomeComponent />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/entries"
                element={
                  <AuthenticatedRoute>
                    <ListEntriesComponent />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/entry/:id"
                element={
                  <AuthenticatedRoute>
                    <EntryComponent />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <AuthenticatedRoute>
                    <LogoutComponent />
                  </AuthenticatedRoute>
                }
              />
              <Route path="*" element={<ErrorComponent />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
