const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Połączenie z bazą danych

const DiscoveredArtists = sequelize.define(
  "DiscoveredArtists",
  {
    mbid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    listeners: {
      type: DataTypes.INTEGER,
    },
    genre1: {
      type: DataTypes.STRING,
    },
    genre2: {
      type: DataTypes.STRING,
    },
    genre3: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT("long"),
    },
    spotify_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "discovered_artists",
<<<<<<< Updated upstream
=======
    timestamps: false,
>>>>>>> Stashed changes
  }
);

module.exports = DiscoveredArtists;
