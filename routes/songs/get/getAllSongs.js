const express = require("express");
const fs = require("fs");
const router = express.Router();
const { readFile } = require("../../../common/commonFunctions");
const { filetypes } = require("../../../common/commonConstants");
const authenticateToken = require("../../Auth/authfunc");

router.get("/", authenticateToken, async (req, res) => {
  const data = await readFile(filetypes.SONGS);
  const songsJson = JSON.parse(data);
  res.send(songsJson);
});

module.exports = router;
