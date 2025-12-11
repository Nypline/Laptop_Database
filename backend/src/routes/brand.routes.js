import express from "express";
import { getBrands, createNewBrand } from "../controllers/brand.controller.js";
const router = express.Router();

router.get("/", getBrands);
router.post("/", createNewBrand);

export default router;
