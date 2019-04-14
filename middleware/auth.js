const config = process.env.JWTSecret || "devsecret";
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token =
    req.header("x-auth-token") ||
    req.query["x-auth-token"] ||
    req.body.token ||
    req.headers["x-auth-token"];
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, config);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ msg: "Token is not valid." });
  }
}

module.exports = auth;
