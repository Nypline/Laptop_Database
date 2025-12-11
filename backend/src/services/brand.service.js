import db from "../config/db.js";

export const getAllBrands = async () => {
  const [rows] = await db.query("SELECT * FROM brands ORDER BY id DESC");
  return rows;
};

export const createBrand = async (name) => {
  const [result] = await db.query("INSERT INTO brands (name) VALUES (?)", [
    name,
  ]);
  return result.insertId;
};
