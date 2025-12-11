import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <header
      style={{
        background: "rgba(0, 0, 40, 0.45)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(120, 170, 255, 0.25)",
        padding: "14px 24px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxShadow: "0 0 20px rgba(0, 110, 255, 0.15)",
      }}
    >
      <nav
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#77aaff",
            fontWeight: 700,
            fontSize: "1.4rem",
            textDecoration: "none",
            letterSpacing: "1px",
            textShadow: "0 0 8px #006eff",
          }}
        >
          🚀 LaptopInventory
        </Link>

        <div style={{ display: "flex", gap: "20px" }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "#84aaff" : "#dce6ff",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: "8px",
              background: isActive ? "rgba(0,110,255,0.25)" : "transparent",
              transition: "0.25s",
            })}
          >
            Daftar Laptop
          </NavLink>

          <NavLink
            to="/create"
            style={({ isActive }) => ({
              color: "white",
              background: isActive
                ? "linear-gradient(90deg,#0066ff,#9b4dff)"
                : "linear-gradient(90deg,#0055dd,#7a3cff)",
              padding: "6px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 500,
              boxShadow: "0 0 8px rgba(0,110,255,0.5)",
            })}
          >
            + Tambah Laptop
          </NavLink>

          <button
            onClick={handleLogout}
            style={{
              padding: "6px 12px",
              border: "1px solid #4c6ef5",
              borderRadius: 8,
              cursor: "pointer",
              background: "#0b0f1a",
              color: "#d0d4e4",
              fontWeight: 500,
              transition: "0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#1a2238";
              e.target.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#0b0f1a";
              e.target.style.color = "#d0d4e4";
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
