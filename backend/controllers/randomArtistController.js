const axios = require("axios");

const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;
const LAST_FM_BASE_URL = "http://ws.audioscrobbler.com/2.0/";
const MUSICBRAINZ_BASE_URL = "https://musicbrainz.org/ws/2/";
const SPOTIFY_API_URL = "https://api.spotify.com/v1/";
const { getSpotifyToken } = require("..spotifyAuthService"); // Funkcja do autoryzacji Spotify API

exports.getRandomArtist = async (req, res) => {
  try {
    const topArtistsResponse = await axios.get(`${LAST_FM_BASE_URL}`, {
      params: {
        method: "chart.gettopartists",
        api_key: LAST_FM_API_KEY,
        format: "json",
      },
    });

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
        api_key: LAST_FM_API_KEY,
        format: "json",
      },
    });

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
      },
    });
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error.message);
    res.status(500).json({ message: "Wystąpił problem z serwerem." });
  }
};
