const express = require("express");
const { connectToDb } = require("./db");
const { userRoute } = require("./Routes/user.route");
const { articleRoute } = require("./Routes/article.route");
const { timeLogger } = require("./middleware/timestamp.middleware");
const { limiter } = require("./middleware/rateLimiter.middleware");
const app = express();
app.use(express.json());

const port = process.argv[2];
console.log(port)

app.use(timeLogger)
app.use(limiter)
app.use("/user", userRoute);
 app.use("/articles", articleRoute);



app.listen(port, async () => {
    try {
        await connectToDb
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log("connected to port")
})
