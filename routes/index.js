const Product = require("../models/Products");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("index", {
      pageTitle: "Home",
      products: products,
      user: req.user,
    });
  } catch (err) {
    res.status(500).send("No products retrieved.");
  }
});

module.exports = router;
