const express = require("express");
const fs = require("fs");
const router = express.Router();
const { readFile } = require("../../../common/commonFunctions");
const { filetypes } = require("../../../common/commonConstants");
const authenticateToken = require("../../Auth/authfunc");

router.post("/", authenticateToken, async (req, res) => {
  const data = await readFile(filetypes.SONGS);
  const songJson = JSON.parse(data);

  const randomSong = Math.floor(Math.random() * songJson.length);

  res.send(songJson[randomSong]);
});

module.exports = router;
