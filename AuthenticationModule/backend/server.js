const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is opened on PORT ${PORT}`));
