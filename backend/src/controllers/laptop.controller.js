import * as laptopService from "../services/laptop.service.js";
import { laptopSchema } from "../validations/schemas.js";

export const getLaptops = async (req, res, next) => {
  try {
    const search = req.query.search || "";

    const rows = await laptopService.getAllLaptops(search);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const getLaptop = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });

    const row = await laptopService.getLaptopById(id);
    if (!row) return res.status(404).json({ error: "Laptop not found" });

    res.json(row);
  } catch (err) {
    next(err);
  }
};

export const createLaptop = async (req, res, next) => {
  try {
    const body = {
      ...req.body,
      brand_id: Number(req.body.brand_id),
      category_id: Number(req.body.category_id),
      price: Number(req.body.price),
      release_year: req.body.release_year
        ? Number(req.body.release_year)
        : undefined,
    };

    const parse = laptopSchema.safeParse(body);
    if (!parse.success) return res.status(400).json(parse.error.format());

    const id = await laptopService.createLaptop(parse.data);
    res.status(201).json({ id, message: "Laptop created" });
  } catch (err) {
    next(err);
  }
};

export const updateLaptop = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });

    const body = {
      ...req.body,
      brand_id: Number(req.body.brand_id),
      category_id: Number(req.body.category_id),
      price: Number(req.body.price),
      release_year: req.body.release_year
        ? Number(req.body.release_year)
        : undefined,
    };

    const parse = laptopSchema.safeParse(body);
    if (!parse.success) return res.status(400).json(parse.error.format());

    const affected = await laptopService.updateLaptop(id, parse.data);
    if (!affected) return res.status(404).json({ error: "Laptop not found" });
    res.json({ message: "Laptop updated" });
  } catch (err) {
    next(err);
  }
};

export const deleteLaptop = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });

    const affected = await laptopService.deleteLaptop(id);
    if (!affected) return res.status(404).json({ error: "Laptop not found" });
    res.json({ message: "Laptop deleted" });
  } catch (err) {
    next(err);
  }
};
