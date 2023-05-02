const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { articleModel } = require("../Model/article.model");

const articleRoute = express.Router();


articleRoute.use(auth)


articleRoute.get("/", async (req, res) => {
    let { category, title, page, limit } = req.query;

    let skip = (+page - 1) * limit
    if (page == null || page == undefined || page <= 0) {
        skip = 0
    }
    try {
        if (category && title) {
            let data = await articleModel.find({ title: { $regex: title }, category: { $regex: category }, user: req.body.user }).skip(skip).limit(limit)
            console.log(category, title, data)
            res.send({ articles: data })
        } else if (category) {
            let data = await articleModel.find({ category: { $regex: category }, user: req.body.user }).skip(skip).limit(limit)
            res.send({ articles: data })
        } else if (title) {
            let data = await articleModel.find({ title: { $regex: title }, user: req.body.user }).skip(skip).limit(limit)
            res.send({ articles: data })
        } else {
            let data = await articleModel.find({ user: req.body.user }).skip(skip).limit(limit);
            res.send({ articles: data })
        }

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})
articleRoute.get("/:id", async (req, res) => {
    let id = req.params.id
    try {
        let art = await articleModel.findById(id);
        res.send({ article: art })
    } catch (error) {

    }
})
articleRoute.post("/add", async (req, res) => {
    try {

        let data = new articleModel(req.body);
        //console.log(data)
        data.save()
        res.status(200).send({ msg: "article Added" })
    } catch (error) {
        //console.log(error)

        res.status(400).send({ msg: error.message })
    }
})

articleRoute.patch("/edit/:id", async (req, res) => {
    let id = req.params.id
    try {
        let art = await articleModel.findById(id);
        if (art.userID == req.body.userID) {
            let data = await articleModel.findByIdAndUpdate(id, req.body);
            res.send({ msg: "article updated" })
        } else {
            res.status(400).send({ msg: "you are not authorized to update the article" })
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
articleRoute.delete("/rem/:id", async (req, res) => {
    let id = req.params.id
    try {
        let art = await articleModel.findById(id);
        if (art.userID == req.body.userID) {
            let data = await articleModel.findByIdAndDelete(id);
            res.send({ msg: "article deleted" })
        } else {
            res.status(400).send({ msg: "you are not authorized to delete the article" })
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
module.exports = {
    articleRoute
}