const express = require("express");
const app = express.Router();
const { User } = require("../db");
const { Order } = require("../db/index");

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  } catch (ex) {
    next(ex);
  }
});

app.put("/", async (req, res, next) => {
  try {
    console.log(
      "HERE IS REQ.HEADERS.AUTH FROM app.put/api/orders",
      req.headers.authorization
    );
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.checkout());
  } catch (ex) {
    next(ex);
  }
});

app.get("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.post("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

//Build out past orders api endpoints

app.get("/past", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    console.log("user", user);
    res.send(await user.getPastOrders());
  } catch (ex) {
    next(ex);
  }
});

app.post("/past", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.archiveOrders(req.body));
  } catch (ex) {
    next(ex);
  }
});
