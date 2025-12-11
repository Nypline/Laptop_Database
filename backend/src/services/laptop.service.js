import db from "../config/db.js";

export const getAllLaptops = async (search = "") => {
  const keyword = `%${search}%`;

  const [rows] = await db.query(
    `
    SELECT laptops.*, brands.name AS brand_name, categories.name AS category_name
    FROM laptops
    JOIN brands ON laptops.brand_id = brands.id
    JOIN categories ON laptops.category_id = categories.id
    WHERE laptops.model LIKE ?
       OR brands.name LIKE ?
       OR categories.name LIKE ?
    ORDER BY laptops.id DESC
  `,
    [keyword, keyword, keyword]
  );

  return rows;
};

export const getLaptopById = async (id) => {
  const [[row]] = await db.query(
    `
    SELECT laptops.*, brands.name AS brand_name, categories.name AS category_name
    FROM laptops
    JOIN brands ON laptops.brand_id = brands.id
    JOIN categories ON laptops.category_id = categories.id
    WHERE laptops.id = ?
  `,
    [id]
  );

  return row;
};

export const createLaptop = async ({
  brand_id,
  category_id,
  model,
  price,
  release_year,
  description,
}) => {
  const [result] = await db.query(
    `INSERT INTO laptops (brand_id, category_id, model, price, release_year, description)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      brand_id,
      category_id,
      model,
      price,
      release_year || null,
      description || null,
    ]
  );
  return result.insertId;
};

export const updateLaptop = async (id, data) => {
  const { brand_id, category_id, model, price, release_year, description } =
    data;

  const [result] = await db.query(
    `UPDATE laptops SET brand_id=?, category_id=?, model=?, price=?, release_year=?, description=? WHERE id = ?`,
    [
      brand_id,
      category_id,
      model,
      price,
      release_year || null,
      description || null,
      id,
    ]
  );
  return result.affectedRows;
};

export const deleteLaptop = async (id) => {
  const [result] = await db.query(`DELETE FROM laptops WHERE id = ?`, [id]);
  return result.affectedRows;
};
