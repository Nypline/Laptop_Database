import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import React from "react";
import "../styles/form.css";
import "../styles/main.css";

export default function LaptopEdit() {
  const { id } = useParams();
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

    api.get(`/laptops/${id}`).then((res) => {
      const d = res.data;
      setForm({
        brand_id: d.brand_id,
        category_id: d.category_id,
        model: d.model,
        price: d.price,
        release_year: d.release_year || "",
        description: d.description || "",
      });
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/laptops/${id}`, {
        ...form,
        brand_id: Number(form.brand_id),
        category_id: Number(form.category_id),
        price: Number(form.price),
        release_year: form.release_year ? Number(form.release_year) : undefined,
      });

      navigate("/");
    } catch (err) {
      alert("Error: " + (err?.response?.data?.message || "Gagal update"));
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">✨ Edit Laptop</h1>

      <form onSubmit={submit} className="form-card">
        <div className="form-group">
          <label>Brand</label>
          <select
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

        <div className="form-group">
          <label>Category</label>
          <select
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

        <div className="form-group">
          <label>Model</label>
          <input
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Release Year</label>
          <input
            type="number"
            value={form.release_year}
            onChange={(e) => setForm({ ...form, release_year: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
        </div>

        <button className="btn-save">Simpan Perubahan</button>
      </form>
    </div>
  );
}
