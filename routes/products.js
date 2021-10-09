const router = require("express").Router();
const Product = require("../models/Products");
const controller = require("../controllers/productController");
const { isLoggedIn } = require("../controllers/middleware/verifyUser");

// @desc    Login Page
// @route   GET /products/add
router.get("/add", isLoggedIn, controller.getProductPage);

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    // res.send(products);
    res.render('index', {
        products: products.name, 
        user: req.user,
    });
  } catch (err) {
    res.status(500).send("No products retrieved.");
  }
});

router.get("/:name", async (req, res) => {
  try {
    const products = await Product.find({ name: req.params.name });
    res.send(products);
  } catch (err) {
    res.status(400).send("No products retrieved.");
  }
});

// Protected route example/test
// router.get("/", isLoggedIn, (req, res) => {
//   res.send(`${req.user.name} is Logged in`);
// });

module.exports = router;
