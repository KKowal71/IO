const mongoose = require("mongoose");
const mysql = require("mysql");

const dataBase = async () => {
  const db = await mysql.createConnection({
    host: "io2023.mysql.database.azure.com",
    user: "studentuser",
    password: "kuxgox-6zavgi-qUkkib",
    database: "greenchallenge",
    port: "3306",
    ssl: true,
  });
  const connect = await db.connect((err) => {
    if (err) {
      console.error("Błąd połączenia z bazą danych:", err);
    }
    console.log("Mysql database is connected");
  });
};

module.exports = dataBase;
