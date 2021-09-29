const router = require("express").Router();
const Product = require("../models/Products");
const { isLoggedIn } = require("../controllers/middleware/verifyUser");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send("No Products retrieved.");
  }
});

router.get("/products/:name", async (req, res) => {
  try {
    const products = await Product.find({ name: req.params.name });
    res.send(products);
  } catch (err) {
    res.status(400).send("No Products retrieved.");
  }
});

// Protected route example/test
router.get("/", isLoggedIn, (req, res) => {
  res.send(`${req.user.name} is Logged in`);
});

module.exports = router;
