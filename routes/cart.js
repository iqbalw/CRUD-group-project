const router = require('express').Router();
const controller = require('../controllers/cartController');
const { isLoggedIn } = require('../controllers/middleware/verifyUser');
const {removeFromCartValidation, addToCartValidation } = require('../controllers/middleware/dataValidation');

// @desc    Render the Cart page
// @route   /cart
router.get('/', isLoggedIn, controller.getCartPage);

// @desc    Add a product to the user's cart
// @route   /cart/add
router.post('/add', isLoggedIn, addToCartValidation, controller.addToCart);

// @desc    Remove a product from the user's cart
// @route   /cart/remove
router.delete('/remove', isLoggedIn, removeFromCartValidation, controller.removeFromCart);

// @desc    Remove and item object (product and quantity) from the cart
// @route   /cart/remove/all
router.delete('/remove/all', isLoggedIn, removeFromCartValidation, controller.removeAllFromCart);

module.exports = router;