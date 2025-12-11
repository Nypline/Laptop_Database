import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { username, password });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);

        // INI YANG PENTING!
        setToken(res.data.token);

        navigate("/");
      } else {
        setError("Login gagal");
      }
    } catch (err) {
      setError("Username atau password salah");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1a2350, #050611)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 12,
          padding: "40px 30px",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.6)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 25,
            fontSize: 28,
            letterSpacing: 1,
            textShadow: "0 0 10px rgba(0,0,0,0.8)",
          }}
        >
          Login
        </h2>

        {error && (
          <p
            style={{ color: "#ff6b6b", textAlign: "center", marginBottom: 10 }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "94%",
              padding: 12,
              marginBottom: 15,
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "94%",
              padding: 12,
              marginBottom: 20,
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              background: "linear-gradient(90deg, #4e5cff, #6c7bff)",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 0 12px rgba(78,92,255,0.5)",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
