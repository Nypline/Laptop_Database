import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const USER = {
  username: "admin",
  password: "123456",
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Body tidak lengkap" });
  }

  if (username === USER.username && password === USER.password) {
    const token = jwt.sign({ username }, "SECRET123", { expiresIn: "1d" });

    return res.json({
      success: true,
      message: "Login berhasil",
      token,
    });
  }

  return res.status(400).json({
    success: false,
    message: "Username atau password salah",
  });
});

export default router;
