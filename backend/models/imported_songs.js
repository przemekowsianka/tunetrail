const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Połączenie z bazą danych

const ImportedSongs = sequelize.define(
  "ImportedSongs",
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
    artist_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    playcount: {
      type: DataTypes.INTEGER,
    },
    genre: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "imported_songs",
<<<<<<< Updated upstream
=======
    timestamps: false,
>>>>>>> Stashed changes
  }
);

module.exports = ImportedSongs;
