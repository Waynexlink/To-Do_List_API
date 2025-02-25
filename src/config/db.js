const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Database Connected ...");
  } catch (error) {
    console.log("Database Connection error", error.message);
    process.exit(1); //stops the code
  }
};

module.exports = connectDB;
