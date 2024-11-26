require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const app = express();
const { sequelize } = require("./models");

// Middleware
app.use(express.json());

//dane z .env
require("dotenv").config();

// Konfiguracja połączenia z bazą MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Sprawdzenie połączenia z bazą danych
db.connect((error) => {
  if (error) {
    console.error("Błąd połączenia z MySQL:", error.message);
  } else {
    console.log("Połączono z MySQL");
  }
});

// Przykładowa trasa do testowania połączenia
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS solution", (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json({ solution: results[0].solution });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

(async () => {
  try {
    await sequelize.sync({ alter: false }); // alter: false, aby nie modyfikować istniejących tabel
    console.log("Modele zsynchronizowane z bazą danych");
  } catch (error) {
    console.error("Błąd synchronizacji modeli:", error);
  }
})();
