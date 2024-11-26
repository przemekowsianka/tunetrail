const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicController");
const auth = require("../middleware/auth"); // Middleware do autoryzacji

// Trasy do pobierania danych z Last.fm
router.get("/user/top-artists", auth, musicController.getUserTopArtists);
router.get("/user/top-tracks", auth, musicController.getUserTopTracks);
router.get("/user/top-tags", auth, musicController.getUserTopTags);
router.get("/global/top-artists", auth, musicController.getGlobalTopArtists);
router.get("/global/top-tracks", auth, musicController.getGlobalTopTracks);

module.exports = router;
