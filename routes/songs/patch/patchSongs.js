const express = require("express");
const fs = require("fs");
const router = express.Router();
const { readFile, writeFile } = require("../../../common/commonFunctions");
const { filetypes } = require("../../../common/commonConstants");
const xssMiddleware = require("../../../middlewares/xss/xssMiddleware");
const authenticateToken = require("../../Auth/authfunc");

router.patch("/:id", authenticateToken, xssMiddleware, async (req, res) => {
  const data = await readFile(filetypes.SONGS);
  const songsJson = JSON.parse(data);

  const findSongByIndex = songsJson.findIndex(
    (song) => song.id === parseInt(req.params.id)
  );
  if (findSongByIndex === -1) {
    res.status(404).send("Song not found");
    return;
  }

  // const { name, artist, rate } = req.body;
  // songsJson[findSongByIndex] = {
  //   id: songsJson[findSongByIndex].id,
  //   name,
  //   artist: songsJson[findSongByIndex].artist,
  //   rate,
  //   deleted: songsJson[findSongByIndex].deleted,
  // };

  // let updatedSong = { ...findSongByIndex };
  // console.log("Updated Song :", updatedSong);
  // for (let key in req.body) {
  //   songsJson[findSongByIndex] = { ...updatedSong, [key]: req.body[key] };
  // }

  let updatedSong = { ...songsJson[findSongByIndex] };
  console.log("Updated Song :", updatedSong);

  updatedSong = {
    ...updatedSong,
    ...req.body,
  };

  songsJson[findSongByIndex] = updatedSong;

  await writeFile(filetypes.SONGS, JSON.stringify(songsJson));

  res.send("Song has been updated");

  console.log("Sanitized updated song: ", songsJson);
});

module.exports = router;
