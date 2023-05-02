const express = require("express");
const { userModel } = require("../Model/user.model");
const userRoute = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

userRoute.post("/register", async (req, res) => {
    let password = req.body.password;
    let email = req.body.email;

    try {
        let userr = await userModel.findOne({ email: email });
        console.log(userr)
        if (userr != null || userr != undefined) {
            res.status(400).send({ msg: "user already exists!!" })
            return
        }
        let hash = await bcrypt.hash(password, 5);
        console.log(hash)
        let data = new userModel({ ...req.body, password: hash });
        console.log(data)
        data.save()
        res.status(200).send({ msg: "User Added" })
    } catch (error) {
        //console.log(error)

        res.status(400).send({ msg: error.message })
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        let data = await userModel.findOne({ email: email });
        bcrypt.compare(password, data.password, function (err, result) {
            // result == true
            if (result) {
                var token = jwt.sign({ userID: data._id ,user:data.name}, 'eval');
                res.status(200).send({ msg: "Login successfull", token: token })
            } else {
                res.status(200).send({ msg: "Invalid password" })
            }
        });

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

module.exports = {
    userRoute
}