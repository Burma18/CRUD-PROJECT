const express = require("express");
const router = express.Router();
const { readFile } = require("../../common/commonFunctions");
const { filetypes } = require("../../common/commonConstants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

router.post("/", async (req, res) => {
  const data = await readFile(filetypes.USERS);
  const usersJson = JSON.parse(data);

  const { username, password, id, favoriteSong_id } = req.body;

  const userFind = usersJson.find((user) => user.username === username);
  if (!userFind) {
    res.send("wrong user!");
    return;
  }

  const pwsMatch = await bcrypt.compare(password, userFind.password);

  if (!pwsMatch) {
    res.send("wrong user!");
    return;
  }

  const accessToken = jwt.sign(
    { name: username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "120s" }
  );
  const refreshToken = jwt.sign(
    { name: username },
    process.env.REFRESH_TOKEN_SECRET
  );

  refreshTokens.push(refreshToken);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

module.exports = router;
