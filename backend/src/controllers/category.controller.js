import * as categoryService from "../services/category.service.js";
import { categorySchema } from "../validations/schemas.js";

export const getCategories = async (req, res, next) => {
  try {
    const rows = await categoryService.getAllCategories();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const createNewCategory = async (req, res, next) => {
  try {
    const parse = categorySchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json(parse.error.format());

    const id = await categoryService.createCategory(parse.data.name);
    res.status(201).json({ id, message: "Category created" });
  } catch (err) {
    next(err);
  }
};
