const express = require("express");
const app = express.Router();
const { User } = require("../db");

app.post("/", async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get("/", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

app.post("/register", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const token = newUser.generateToken();
    res.status(201).send({...newUser, token});
  } catch (ex) {
    res
      .status(500)
      .json({ message: "Error registering new user", error: ex.message });
  }
});

module.exports = app; 