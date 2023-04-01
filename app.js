const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const logger = require("./logger");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const { writeStream } = require("./middlewares/morgan/writeStream");

app.use(express.json());
app.use(morgan("common", { stream: writeStream }));
app.use(cors());

const PORT = process.env.PORT;

const getAllSongs = require("./routes/songs/get/getAllSongs");
const createSongsWithId = require("./routes/songs/post/postSongs");
const updateSong = require("./routes/songs/patch/patchSongs");
const softDeleteSongs = require("./routes/songs/delete/softDeleteSongs");
const hardDeleteSongs = require("./routes/songs/delete/hardDeleteSong");
const getRandomSongByRating = require("./routes/songs/get/getRandomsong");
const createRandomSong = require("./routes/songs/post/postRandomSong");
const signUpUser = require("./routes/Auth/signup");
const signInUser = require("./routes/Auth/signin");
const addFavoriteMusic = require("./routes/songs/post/addFavoriteMusic");
const tokenRouter = require("./routes/Auth/token");

app.use("/songs", getAllSongs);
app.use("/songs", createSongsWithId);
app.use("/songs", updateSong);
app.use("/songsSoft", softDeleteSongs);
app.use("/songs", hardDeleteSongs);
app.use("/songs/randomSong/rating", getRandomSongByRating);
app.use("/songs/randomSong", createRandomSong);
app.use("/signup", signUpUser);
app.use("/signin", signInUser);
app.use("/songs/favoriteSong", addFavoriteMusic);
app.use("/token", tokenRouter);

app.listen(PORT || 4000, () => console.log("listening on port 3000"));

// add documentation: swagger: from npm
