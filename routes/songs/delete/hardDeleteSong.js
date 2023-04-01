const express = require("express");
const fs = require("fs");
const router = express.Router();
const { readFile } = require("../../../common/commonFunctions");
const { filetypes } = require("../../../common/commonConstants");
const authenticateToken = require("../../Auth/authfunc");

router.delete("/:id", authenticateToken, async (req, res) => {
  const data = await readFile(filetypes.SONGS);
  const songJson = JSON.parse(data);
  const newArr = [];
  for (let song = 0; song < songJson.length; song++) {
    console.log("songJson[song :", songJson[song], req.params.id);

    if (songJson[song].id !== parseInt(req.params.id)) {
      newArr.push(songJson[song]);
    }
  }

  await writeFile(filetypes.SONGS, JSON.stringify(newArr));

  res.send("Song was successfully deleted");
});

module.exports = router;
