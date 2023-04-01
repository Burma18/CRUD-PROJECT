const express = require("express");
const fs = require("fs");
const router = express.Router();
const { readFile } = require("../../../common/commonFunctions");
const { filetypes } = require("../../../common/commonConstants");
const authenticateToken = require("../../Auth/authfunc");

router.delete("/:id", authenticateToken, async (req, res) => {
  const data = await readFile(filetypes.SONGS);
  const songsJson = JSON.parse(data);

  const songToDelete = songsJson.find(
    (song) => song.id === parseInt(req.params.id)
  );

  if (!songToDelete) {
    res.status(404).send("Song is not found");
    return;
  }

  songToDelete.deleted = true;

  // Set deleted to false for all songs that were not deleted
  songsJson.forEach((song) => {
    if (!song.deleted) {
      song.deleted = false;
    }
  });

  await writeFile(filetypes.SONGS, JSON.stringify(songsJson));

  res.send("Song has been soft-deleted");
});

module.exports = router;
