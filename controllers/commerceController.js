const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProductById,
} = require("../queries/commerce");

const { checkRating, validateURL } = require("../validations/validations");

//get all products
router.get("/", async (req, res) => {
  let result = await getAllProducts();

  if (result.length === 0) {
    res.status(404).send("No Products Available");
  } else {
    res.send(result);
  }
});

//get product by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  let result = await getProductById(id);

  if (result.length === 0) {
    res.status(404).send("The product doesnot exist!");
  } else {
    res.json(result[0]);
  }

  return result[0];
});

//delete product by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let result = await deleteProductById(id);

  if (Object.keys(result).length === 0) {
    res.status(404).send("The product doesnot exist!");
  } else {
    res.json(result);
  }
});

//create a product
router.post("/new", checkRating, validateURL, async (req, res) => {
  let result = await createProduct(req.body);

  if (Object.keys(result).length === 0) {
    res.status(404).send("Couldn't create the product!");
  } else {
    res.json(result);
  }
});

//uodate a product by id
router.put("/edit/:id", checkRating, validateURL, async (req, res) => {
  const { id } = req.params;
  let result = await updateProductById(req.body, id);

  if (result.length === 0) {
    res.status(404).json({ error: "Product not found!" });
  } else {
    res.json(result[0]);
  }
});

module.exports = router;
