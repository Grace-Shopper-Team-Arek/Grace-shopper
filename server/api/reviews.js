const express = require("express");
const app = express.Router();
const { Review } = require("../db");


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
        const {data} = await Review.findAll({
            where: {
                productId: req.params.id,
            }
        })
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

app.post("/", async (req, res, next) => {
    try {
        console.log("post body:", req.body);
        const newReview = {
            userId: req.body.userId,
            productId: req.body.productId,
            review: req.body.reviewText,
            rating: req.body.reviewScore,
        }
        const response = await Review.create(newReview);
        console.log("post response: ", response);
        res.send(response.data);
    } catch (error) {
        console.log(error);
    }
})

module.exports = app;