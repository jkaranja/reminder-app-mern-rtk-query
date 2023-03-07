const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    const user = await User.findById(decoded.id)
      .select("-password")
      .lean()
      .exec();

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized. Please try again or contact support",
      });
    }

    req.user = user;

    next();
  });
};

module.exports = verifyJWT;
