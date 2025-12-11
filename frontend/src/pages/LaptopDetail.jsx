import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import React from "react";

export default function LaptopDetail() {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);

  useEffect(() => {
    api.get(`/laptops/${id}`).then((res) => setLaptop(res.data));
  }, [id]);

  if (!laptop)
    return (
      <p style={{ textAlign: "center", marginTop: 40, fontSize: 18 }}>
        Loading...
      </p>
    );

  return (
    <div className="space-card" style={{ maxWidth: 700, margin: "40px auto" }}>
      <h1 style={{ fontSize: "2rem", color: "#9fb7ff", marginBottom: 20 }}>
        {laptop.model}
      </h1>

      <div style={{ lineHeight: "1.8" }}>
        <p>
          <strong>Brand:</strong> {laptop.brand_name}
        </p>
        <p>
          <strong>Category:</strong> {laptop.category_name}
        </p>
        <p>
          <strong>Price:</strong> Rp {Number(laptop.price).toLocaleString()}
        </p>
        <p>
          <strong>Year:</strong> {laptop.release_year}
        </p>
        <p>
          <strong>Description:</strong> {laptop.description || "-"}
        </p>
      </div>

      <Link
        to="/"
        className="btn-neon"
        style={{ marginTop: 20, textDecoration: "none" }}
      >
        ⬅ Kembali
      </Link>
    </div>
  );
}
