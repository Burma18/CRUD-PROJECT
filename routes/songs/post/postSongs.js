const express = require("express");
const fs = require("fs");
const router = express.Router();
const { readFile, writeFile } = require("../../../common/commonFunctions");
const { filetypes } = require("../../../common/commonConstants");
const xssMiddleware = require("../../../middlewares/xss/xssMiddleware");
const authenticateToken = require("../../Auth/authfunc");

router.post("/", xssMiddleware, authenticateToken, async (req, res) => {
  const { name, artist, rate } = req.body;

  const newSong = { name, artist, rate };

  const data = await readFile(filetypes.SONGS);
  const songs = JSON.parse(data);

  newSong.id = songs.length + 1;

  console.log("newsong id :", newSong.id);

  songs.push(newSong);

  console.log("updated data :", songs);

  await writeFile(filetypes.SONGS, JSON.stringify(songs));
  res.send(songs);

  console.log("Sanitized name: ", req.body.name);
  console.log("Sanitized artist: ", req.body.artist);
  console.log("Sanitized rate: ", req.body.rate);
});

module.exports = router;
