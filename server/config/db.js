const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.URI;

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log("Successfully connected to DataBase");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = connect;
