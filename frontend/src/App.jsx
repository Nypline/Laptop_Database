import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LaptopList from "./pages/LaptopList";
import LaptopDetail from "./pages/LaptopDetail";
import LaptopCreate from "./pages/LaptopCreate";
import LaptopEdit from "./pages/LaptopEdit";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <div>
      {token && <Navbar setToken={setToken} />}

      <main style={{ padding: 20 }}>
        <Routes>
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/" replace />
              ) : (
                <Login setToken={setToken} />
              )
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LaptopList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/detail/:id"
            element={
              <ProtectedRoute>
                <LaptopDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <LaptopCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <LaptopEdit />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
