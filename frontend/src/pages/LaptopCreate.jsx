import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LaptopCreate() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    brand_id: "",
    category_id: "",
    model: "",
    price: "",
    release_year: "",
    description: "",
  });

  useEffect(() => {
    api.get("/brands").then((r) => setBrands(r.data));
    api.get("/categories").then((r) => setCategories(r.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/laptops", {
        ...form,
        brand_id: Number(form.brand_id),
        category_id: Number(form.category_id),
        price: Number(form.price),
        release_year: form.release_year ? Number(form.release_year) : undefined,
      });
      navigate("/");
    } catch (err) {
      alert("Error: " + (err?.response?.data?.message || "Periksa input"));
    }
  };

  return (
    <div
      style={{
        maxWidth: "750px",
        margin: "40px auto",
        padding: "30px",
        background: "rgba(25, 28, 62, 0.65)",
        borderRadius: "14px",
        boxShadow: "0 0 28px rgba(115, 140, 255, 0.25)",
        border: "1px solid rgba(160,170,255,0.20)",
        color: "#e7eaff",
        backdropFilter: "blur(10px)",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
          fontSize: "1.7rem",
          fontWeight: 700,
          color: "#9bb3ff",
          letterSpacing: "0.5px",
        }}
      >
        🚀 Tambah Laptop Baru
      </h2>

      <form onSubmit={submit} style={{ display: "grid", gap: "20px" }}>
        <div>
          <label style={labelStyle}>Brand</label>
          <select
            style={inputStyle}
            value={form.brand_id}
            onChange={(e) => setForm({ ...form, brand_id: e.target.value })}
            required
          >
            <option value="">Pilih Brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Kategori</label>
          <select
            style={inputStyle}
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            required
          >
            <option value="">Pilih Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Model</label>
          <input
            style={inputStyle}
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Harga</label>
          <input
            type="number"
            style={inputStyle}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Tahun Rilis</label>
          <input
            type="number"
            style={inputStyle}
            value={form.release_year}
            onChange={(e) => setForm({ ...form, release_year: e.target.value })}
          />
        </div>

        <div>
          <label style={labelStyle}>Deskripsi</label>
          <textarea
            style={{ ...inputStyle, minHeight: "95px" }}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 22px",
            background: "linear-gradient(90deg, #5c7cff, #8f5fff)",
            border: "none",
            color: "white",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 700,
            letterSpacing: "0.4px",
            fontSize: "1rem",
            transition: "0.25s",
            boxShadow: "0 0 18px rgba(120,140,255,0.45)",
          }}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

const labelStyle = {
  fontSize: "0.95rem",
  fontWeight: 600,
  marginBottom: "6px",
  display: "block",
  color: "#cdd6ff",
};

const inputStyle = {
  width: "100%",
  padding: "12px 0px   ",
  borderRadius: "10px",
  border: "1px solid rgba(200,200,255,0.25)",
  fontSize: "1rem",
  outline: "none",
  background: "rgba(255,255,255,0.06)",
  color: "#6d6d6dff",
  transition: "0.2s",
};
