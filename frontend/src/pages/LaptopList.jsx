import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import React from "react";

export default function LaptopList() {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); 

  const fetch = async () => {
    setLoading(true);
    const res = await api.get("/laptops");
    setList(res.data);
    setFiltered(res.data); 
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus laptop ini?")) return;
    await api.delete(`/laptops/${id}`);
    fetch();
  };


  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearch(text);

    const result = list.filter(
      (l) =>
        l.model.toLowerCase().includes(text) ||
        l.brand_name.toLowerCase().includes(text) ||
        l.category_name.toLowerCase().includes(text)
    );

    setFiltered(result);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto" }} className="space-card">
      <h1 style={{ fontSize: "1.8rem", marginBottom: 20, color: "#9bbbff" }}>
        🌠 Daftar Laptop
      </h1>

      <input
        type="text"
        placeholder="Cari laptop berdasarkan brand / model / kategori..."
        value={search}
        onChange={handleSearch}
        style={{
          width: "98%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #5577cc",
          background: "rgba(10, 20, 40, 0.4)",
          color: "#dce6ff",
          fontSize: "1rem",
          outline: "none",
          boxShadow: "0 0 8px rgba(80,120,255,0.25)",
        }}
      />

      <table className="space-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Category</th>
            <th>Price</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: 20 }}>
                ❌ Tidak ada laptop ditemukan
              </td>
            </tr>
          ) : (
            filtered.map((l, i) => (
              <tr key={l.id}>
                <td>{i + 1}</td>
                <td>{l.brand_name}</td>
                <td>{l.model}</td>
                <td>{l.category_name}</td>
                <td>Rp {l.price.toLocaleString()}</td>
                <td>{l.release_year}</td>
                <td>
                  <Link to={`/detail/${l.id}`} style={{ color: "#84aaff" }}>
                    Detail
                  </Link>{" "}
                  |{" "}
                  <Link to={`/edit/${l.id}`} style={{ color: "#a884ff" }}>
                    Edit
                  </Link>{" "}
                  |{" "}
                  <button
                    onClick={() => handleDelete(l.id)}
                    style={{
                      color: "#ff6b6b",
                      background: "transparent",
                      border: 0,
                      cursor: "pointer",
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
