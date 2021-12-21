const mongoose = require("mongoose");
const { secret } = require("../config/secret");

mongoose.connect(
  `mongodb+srv://${secret.mongoUser}:${secret.mongoPassword}@cluster0.wg7s5.mongodb.net/Laptop_MarketPlace`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongo connected");
});

module.exports = db;
