import * as brandService from "../services/brand.service.js";
import { brandSchema } from "../validations/schemas.js";

export const getBrands = async (req, res, next) => {
  try {
    const rows = await brandService.getAllBrands();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const createNewBrand = async (req, res, next) => {
  try {
    const parse = brandSchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json(parse.error.format());

    const id = await brandService.createBrand(parse.data.name);
    res.status(201).json({ id, message: "Brand created" });
  } catch (err) {
    next(err);
  }
};
