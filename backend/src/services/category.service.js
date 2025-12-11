import db from "../config/db.js";

export const getAllCategories = async () => {
  const [rows] = await db.query("SELECT * FROM categories ORDER BY id DESC");
  return rows;
};

export const createCategory = async (name) => {
  const [result] = await db.query("INSERT INTO categories (name) VALUES (?)", [
    name,
  ]);
  return result.insertId;
};
