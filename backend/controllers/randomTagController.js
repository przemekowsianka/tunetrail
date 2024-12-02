const axios = require("axios");

<<<<<<< Updated upstream
const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;
const LAST_FM_BASE_URL = "http://ws.audioscrobbler.com/2.0/";
const MUSICBRAINZ_BASE_URL = "https://musicbrainz.org/ws/2/";
const SPOTIFY_API_URL = "https://api.spotify.com/v1/";
const { getSpotifyToken } = require("..spotifyAuthService"); // Funkcja do autoryzacji Spotify API

exports.getArtistDetailsWithMBID = async (req, res) => {
  try {
    const topArtistsResponse = await axios.get(`${LAST_FM_BASE_URL}`, {
      params: {
        method: "chart.gettopartists",
=======
const LAST_FM_API_KEY = process.env.LASTFM_API_KEY;
const LAST_FM_BASE_URL = "http://ws.audioscrobbler.com/2.0/";

exports.getRandomTag = async (req, res) => {
  try {
    const topTagsResponse = await axios.get(`${LAST_FM_BASE_URL}`, {
      params: {
        method: "chart.gettoptags",
>>>>>>> Stashed changes
        api_key: LAST_FM_API_KEY,
        format: "json",
      },
    });

<<<<<<< Updated upstream
    const artists = topArtistsResponse.data.artists.artist;

    if (!artists || artists.length === 0) {
      return res.status(404).json({ message: "Nie znaleziono artystów." });
    }

    const randomIndex = Math.floor(Math.random() * artists.length);
    const randomArtist = artists[randomIndex];

    const lastFmResponse = await axios.get(`${LAST_FM_BASE_URL}`, {
      params: {
        method: "artist.getinfo",
        artist: randomArtist,
=======
    const tags = topTagsResponse.data.tags.tag;

    if (!tags || tags.length === 0) {
      return res.status(404).json({ message: "Nie znaleziono artystów." });
    }

    const randomIndex = Math.floor(Math.random() * tags.length);
    const randomTag = tags[randomIndex];

    const lastFmResponse = await axios.get(`${LAST_FM_BASE_URL}`, {
      params: {
        method: "tag.getinfo",
        tag: randomTag,
>>>>>>> Stashed changes
        api_key: LAST_FM_API_KEY,
        format: "json",
      },
    });

<<<<<<< Updated upstream
    const artistData = lastFmResponse.data.artist;
    const mbid = artistData.mbid;

    if (!mbid) {
      return res
        .status(404)
        .json({ message: "MBID nie znaleziono dla podanego artysty." });
    }

    const musicBrainzResponse = await axios.get(
      `${MUSICBRAINZ_BASE_URL}artist/${mbid}`,
      {
        params: { fmt: "json" },
      }
    );

    const aliases = musicBrainzResponse.data.aliases.map((alias) => alias.name);

    const spotifyToken = await getSpotifyToken(); // Funkcja do autoryzacji
    const spotifyResponse = await axios.get(`${SPOTIFY_API_URL}search`, {
      headers: { Authorization: `Bearer ${spotifyToken}` },
      params: {
        q: artistData.name,
        type: "artist",
        limit: 1,
      },
    });

    const spotifyArtist = spotifyResponse.data.artists.items[0];

    // Zwróć dane
    res.json({
      lastFm: {
        name: artistData.name,
        bio: artistData.bio.summary,
        url: artistData.url,
        mbid: mbid,
      },
      musicBrainz: {
        aliases: aliases,
      },
      spotify: {
        name: spotifyArtist.name,
        url: spotifyArtist.external_urls.spotify,
=======
    const tagData = lastFmResponse.data.tag;

    const lastFmResponse2 = await axios.get(`${LAST_FM_BASE_URL}`, {
      params: {
        method: "tag.getTopTracks",
        tag: randomTag,
        api_key: LAST_FM_API_KEY,
        limit: 1,
        format: "json",
      },
    });
    const topTrackData = lastFmResponse2.toptracks.track;
    // Zwróć dane
    res.json({
      Genre: {
        name: tagData.name,
        wiki: tagData.wiki.summary,
        url: tagData.url,
      },
      TopTrack: {
        name: topTrackData.name,
>>>>>>> Stashed changes
      },
    });
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error.message);
    res.status(500).json({ message: "Wystąpił problem z serwerem." });
  }
};
