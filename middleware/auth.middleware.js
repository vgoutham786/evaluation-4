var jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    try {
        var decoded = jwt.verify(token, 'eval');
        if (decoded) {
            req.body.userID = decoded.userID;
            req.body.user=decoded.user;
            next()
        } else {
            res.status(200).send({ msg: "Please login first" })
        }

    } catch (error) {
        res.send({ err: error.message })
    }

}

module.exports={
    auth
}