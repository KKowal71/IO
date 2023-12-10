const mongoose = require("mongoose");

const dataBase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`Mongoo database is connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = dataBase;
