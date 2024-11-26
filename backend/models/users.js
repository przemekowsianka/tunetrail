const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Połączenie z bazą danych
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 10],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    tableName: "users", // Nazwa istniejącej tabeli
    //hashowanie hasła
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10); // Hashowanie hasła przed zapisaniem
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10); // Hashowanie hasła przy aktualizacji
        }
      },
    },
  }
);
User.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = User;
