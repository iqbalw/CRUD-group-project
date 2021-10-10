const router = require("express").Router();
const controller = require("../controllers/productController");
const { productValidation } = require('../controllers/middleware/dataValidation.js');
const { isLoggedIn } = require("../controllers/middleware/verifyUser");

// @desc    Login Page
// @route   GET /products/add
router.get("/add", isLoggedIn, controller.getProductPage);

router.get("/", isLoggedIn, controller.getProducts);

router.get("/:name", isLoggedIn, controller.getProduct);

router.post('/add', productValidation, controller.addProduct);

// Protected route example/test
// router.get("/", isLoggedIn, (req, res) => {
//   res.send(`${req.user.name} is Logged in`);
// });

module.exports = router;
