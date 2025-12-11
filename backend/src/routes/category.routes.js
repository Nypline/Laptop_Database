import express from "express";
import {
  getCategories,
  createNewCategory,
} from "../controllers/category.controller.js";
const router = express.Router();

router.get("/", getCategories);
router.post("/", createNewCategory);

export default router;
