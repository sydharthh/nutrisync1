const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ error: "No token, authorization denied." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
