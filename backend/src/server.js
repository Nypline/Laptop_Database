import express from "express";
import cors from "cors";

import brandRoutes from "./routes/brand.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import laptopRoutes from "./routes/laptop.routes.js";
import authRoutes from "./routes/authRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

// AUTH
app.use("/auth", authRoutes);
// API lain
app.use("/brands", brandRoutes);
app.use("/categories", categoryRoutes);
app.use("/laptops", laptopRoutes);

// Not found handler
app.use((req, res) => res.status(404).json({ error: "Endpoint not found" }));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Backend running: http://localhost:${PORT}`)
);
