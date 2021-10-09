const router = require("express").Router();
const Product = require("../models/Products");
const controller = require("../controllers/productController");
const { productValidation } = require('../controllers/middleware/dataValidation.js');
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

router.post('/add', productValidation, async (req, res) => {
  console.log("adding product...")

  // Create New Product
  const product = new Product({ 
      name: req.body.name,
      description: req.body.desc,
      price: req.body.price
  });

  console.log(product);
  // Save Product in Database
  try {
      const savedProduct = await product.save();
      res.send(savedProduct);
  } catch (err) {
      res.status(400).send(err);
  }
});

// Protected route example/test
// router.get("/", isLoggedIn, (req, res) => {
//   res.send(`${req.user.name} is Logged in`);
// });

module.exports = router;
