//yaseen
const express = require("express");
const app = express.Router();
const { Product } = require("../db/index");

// GET /products (get all products)
app.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (ex) {
    res
      .status(500)
      .json({ message: "Error getting products", error: ex.message });
  }
});

// POST /products (ability for admin to create new product)
app.post("/", async (req, res, next) => {
  try {
      const newProduct = await Product.create(req.body);
      res.status(201).send(newProduct);
  } catch (ex) {
    res
      .status(500)
      .json({ message: "Error creating product", error: ex.message });
  }
});

// GET /products:id (ability to see product details)
app.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (ex) {
    res
      .status(500)
      .json({ message: "Error getting product details", error: ex.message });
  }
});

module.exports = app;
