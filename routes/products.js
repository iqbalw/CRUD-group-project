const router = require("express").Router();
const controller = require("../controllers/productController");
const { productValidation } = require('../controllers/middleware/dataValidation.js');
const { isLoggedIn } = require("../controllers/middleware/verifyUser");

// @desc    Render Login Page
// @route   GET /products/add
router.get("/add", isLoggedIn, controller.getProductPage);

// @desc    Render Edit Products Page
// @route   GET /products/edit
router.get("/edit", isLoggedIn, controller.getEditPage);

router.get("/", isLoggedIn, controller.getProducts);

router.get("/:name", isLoggedIn, controller.getProduct);

router.post('/add', productValidation, controller.addProduct);

router.put('/:name', isLoggedIn, controller.editProduct);

router.delete('/:name', isLoggedIn, controller.deleteProduct);

// Protected route example/test
// router.get("/", isLoggedIn, (req, res) => {
//   res.send(`${req.user.name} is Logged in`);
// });

module.exports = router;
