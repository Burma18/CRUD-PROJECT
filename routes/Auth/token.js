const express = require("express");
const jwt = require("jsonwebtoken");
const generateAccessToken = require("./generateToken");
const router = express.Router();

let refreshTokens = [];

router.post("/", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  //   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);

    const accessToken = generateAccessToken({ name: user.name });

    res.json({ accessToken: accessToken });
  });
});

router.delete("/", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);

  res.send("Token deleted successfully");
});

module.exports = router;
