const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_CONNECT);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;