const express = require("express");
const fs = require("fs");
const router = express.Router();
const { readFile } = require("../../../common/commonFunctions");
const { filetypes } = require("../../../common/commonConstants");

router.get("/:rating", async (req, res) => {
  const data = await readFile(filetypes.SONGS);
  const songJson = JSON.parse(data);

  const filteredSongs = [];
  for (let song = 0; song < songJson.length; song++) {
    if (songJson[song].rate > parseInt(req.params.rating)) {
      filteredSongs.push(songJson[song]);
    }
  }

  const randomSong = Math.floor(Math.random() * filteredSongs.length);
  res.send(filteredSongs[randomSong]);
});

module.exports = router;
