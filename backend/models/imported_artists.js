const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Połączenie z bazą danych

const ImportedArtists = sequelize.define(
  "ImportedArtists",
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
    playcount: {
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
  },
  {
    tableName: "imported_artists",
<<<<<<< Updated upstream
=======
    timestamps: false,
>>>>>>> Stashed changes
  }
);

module.exports = ImportedArtists;
