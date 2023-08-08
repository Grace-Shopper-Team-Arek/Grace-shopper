const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());

//static middleware
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

//parsers
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

app.use("/api/auth", require("./api/auth"));
app.use("/api/orders", require("./api/orders"));
app.use("/api/users", require("./api/user"));
app.use("/api/products", require("./api/products"));

module.exports = app;
