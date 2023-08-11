const express = require("express");
const app = express.Router();
const { User } = require("../db");

module.exports = app;

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

//Register new user route
app.post("/register", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    newUser.generateToken();
    res.status(201).send(newUser);
  } catch (ex) {
    res
      .status(500)
      .json({ message: "Error registering new user", error: ex.message });
  }
});
