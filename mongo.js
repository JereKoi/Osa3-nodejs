const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;
console.log("Connecting to MongoDB:", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

module.exports = mongoose;
