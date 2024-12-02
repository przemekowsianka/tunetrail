const express = require("express");
const router = express.Router();
<<<<<<< Updated upstream
const musicController = require("../controllers/musicController");
const auth = require("../middleware/auth"); // Middleware do autoryzacji

// Trasy do pobierania danych z Last.fm
router.get("/user/top-artists", auth, musicController.getUserTopArtists);
router.get("/user/top-tracks", auth, musicController.getUserTopTracks);
router.get("/user/top-tags", auth, musicController.getUserTopTags);
router.get("/global/top-artists", auth, musicController.getGlobalTopArtists);
router.get("/global/top-tracks", auth, musicController.getGlobalTopTracks);
=======
const userMusicController = require("../controllers/userMusicController");
const randomTagController = require("../controllers/randomTagController");
const randomSongController = require("../controllers/randomSongController");
const randomAlbumController = require("../controllers/randomAlbumController");
const randomArtistController = require("../controllers/randomArtistController");

const auth = require("../middleware/auth"); // Middleware do autoryzacji

// Trasy do pobierania danych z Last.fm
router.get("/top-artists", userMusicController.getUserTopArtists);
router.get("/top-tracks", userMusicController.getUserTopTracks);
router.get("/top-tags", userMusicController.getUserTopTags);
router.get("/random-tag", randomTagController.getRandomTag);
router.get("/random-song", randomSongController.getRandomSong);
router.get("/random-album", randomAlbumController.getRandomAlbum);
router.get("/random-artist", randomArtistController.getRandomArtist);
>>>>>>> Stashed changes

module.exports = router;
