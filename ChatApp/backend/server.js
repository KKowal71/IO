const express = require("express");
const dotenv = require("dotenv");
const { messages } = require("./data/data");
const dataBase = require("./Config/database");
const userRoutes = require("./routes/userRoutes.js");

dotenv.config();
dataBase();
const app = express();
app.use(express.json());

// app.get("/", (request, response) => {
//   response.send("API is running");
// });

// app.get("/api/chat", (request, response) => {
//   response.send(messages);
// });

// app.get("/api/user", (request, response) => {
//   response.send("ugh");
// });

app.use("/api/user", userRoutes); //create endpoint for user, use is instead of get, post etc.

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is opened on PORT ${PORT}`));
