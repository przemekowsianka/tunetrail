const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Połączenie z bazą danych

const SimilarArtists = sequelize.define(
  "SimilarArtists",
  {
    artist_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    similar_artist_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "similar_artists",
<<<<<<< Updated upstream
=======
    timestamps: false,
>>>>>>> Stashed changes
  }
);

module.exports = SimilarArtists;
