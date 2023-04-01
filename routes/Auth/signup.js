const express = require("express");
const router = express.Router();
const { readFile, writeFile } = require("../../common/commonFunctions");
const { filetypes } = require("../../common/commonConstants");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const data = await readFile(filetypes.USERS);
  const usersJson = JSON.parse(data);

  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const favoriteSong_id = [];

  usersJson.push({
    username,
    password: hash,
    id: usersJson.length + 1,
    favoriteSong_id,
  });

  console.log("usersJson :", usersJson);

  await writeFile(filetypes.USERS, JSON.stringify(usersJson));

  res.send(`successful signup!`);
});

module.exports = router;
