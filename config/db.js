const mg = require("mongoose");
require("dotenv").config();
const connection = mg.connect(process.env.mongoDB_URL);

module.exports = connection;
