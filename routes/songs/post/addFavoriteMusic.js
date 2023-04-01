const express = require("express");
const fs = require("fs");
const { readFile } = require("../../../common/commonFunctions");
const { filetypes } = require("../../../common/commonConstants");
const xssMiddleware = require("../../../middlewares/xss/xssMiddleware");
const authenticateToken = require("../../Auth/authfunc");
const router = express.Router();

router.post("/:user_id", xssMiddleware, authenticateToken, async (req, res) => {
  const data = await readFile(filetypes.USERS);
  const usersJson = JSON.parse(data);

  const { favoriteSong } = req.body;
  // if it is a string case
  const userByIndex = usersJson.find(
    (user) => user.id === parseInt(req.params.user_id)
  );
  console.log("userByIndex : ", userByIndex);

  if (!userByIndex) {
    res.status(404).send("User is not found");
    return;
  } else {
    let likedSongs = userByIndex.favoriteSong_id;
    console.log("likedSongs  :", likedSongs);
    likedSongs.push(favoriteSong);

    usersJson.favoriteSong_id = likedSongs;
  }
  await writeFile(filetypes.USERS, JSON.stringify(usersJson));
  res.send("Successfully saved!");

  console.log("Sanitized favoriteSong: ", req.body.favoriteSong);
});

module.exports = router;
