const router = require("express").Router();
const { Product } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log({ products });
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).send("Something went wrong!");
    }
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
