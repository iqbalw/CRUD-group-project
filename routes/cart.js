const router = require('express').Router();
const controller = require('../controllers/cartController');
const { isLoggedIn } = require('../controllers/middleware/verifyUser');

// @desc    Render the Cart page
// @route   /cart
router.get('/', isLoggedIn, controller.getCartPage);

// @desc    Add a product to the user's cart
// @route   /cart/add
router.post('/add', isLoggedIn, controller.addToCart);

// @desc    Remove a product from the user's cart
// @route   /cart/remove
router.delete('/remove', isLoggedIn, controller.removeFromCart);

module.exports = router;