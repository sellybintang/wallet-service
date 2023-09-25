const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const database = () => {
  try {
    mongoose.connect(process.env.DB_MONGODB);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
    console.log("Failed to connect to MongoDB");
  }
};
module.exports = database;
