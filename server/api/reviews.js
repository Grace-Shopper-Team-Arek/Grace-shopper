const express = require("express");
const app = express.Router();
const { Review, User } = require("../db/index");


app.get("/", async (req, res, next) => {
    try {
        const allReviews = await Review.findAll()
        res.send(allReviews);
    } catch (error) {
        console.log(error);
    }
});

app.get("/:id", async (req, res, next) => {
    try {
        const data = await Review.findAll({
            where: {
                productId: req.params.id,
            },
            include:[{
                model: User, attributes: ["username"],
            }]
        })
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

app.post("/", async (req, res, next) => {
    try {
        const newReview = {
            userId: req.body.userId,
            productId: req.body.productId,
            review: req.body.reviewText,
            rating: req.body.reviewScore,
        }
        const response = await Review.create(newReview);
        res.send(response.dataValues);
    } catch (error) {
        console.log(error);
    }
});

app.put("/:id", async (req, res, next) => {
    try {
        const update = {
            review: req.body.reviewText,
            rating: req.body.reviewScore,
        }
        await Review.update(update, {
            where: {id: req.body.reviewId}
        });
        return res.status(200).send("Update succeeded");
    } catch (error) {
        console.log(error);
    }
});

module.exports = app;