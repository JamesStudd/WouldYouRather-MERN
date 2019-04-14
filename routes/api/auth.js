const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./../../middleware/auth");
const config = process.env.JWTSecret || "devsecret";

// User Model
const User = require("./../../models/User");

router.post("/", (req, res) => {
  if (!req.body)
    return res.status(400).json({ msg: "Please enter all fields." });

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  User.findOne({ username }).then(user => {
    if (!user) return res.status(400).json({ msg: "Invalid credentials." });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(401).json({ msg: "Invalid credentials." });

      jwt.sign({ id: user.id }, config, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username
          }
        });
      });
    });
  });
});

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
