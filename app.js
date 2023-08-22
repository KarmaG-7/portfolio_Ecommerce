//Dependencies
const express = require("express");
const cors = require("cors");

//Configuration
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const productsController = require("./controllers/commerceController");

app.get("/", (req, res) => {
  res.send("Welcome to KARMA store");
});

app.use("/products", productsController);

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found :(");
});
module.exports = app;
