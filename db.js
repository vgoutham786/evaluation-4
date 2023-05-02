const mongoose = require("mongoose");
require("dotenv").config()

const connectToDb = mongoose.connect(process.env.mongoURL);

module.exports = {
    connectToDb
}