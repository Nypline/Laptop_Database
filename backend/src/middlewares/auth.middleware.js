import jwt from "jsonwebtoken";

const SECRET = "SECRET123";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Token tidak diberikan" });
  }

  const token = header.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token hilang" });

  try {
    jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid" });
  }
}
