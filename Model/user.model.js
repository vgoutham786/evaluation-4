const mongoose = require("mongoose");
//var uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true },
    password: String,
    city: String,
    age: Number
})
//userSchema.plugin(uniqueValidator, { message: 'user already exists!!' });


const userModel = mongoose.model("user", userSchema)

module.exports = {
    userModel
}