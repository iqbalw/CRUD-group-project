const router = require('express').Router();
const Product = require('../models/Products');
const User = require('../models/User');
const { isLoggedIn } = require('../controllers/middleware/verifyUser');

router.get('/', isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user._id).populate('cart.productID');
    res.json(user.cart);
});

router.post('/add', isLoggedIn, async (req, res) => {
    // Check if given product exists
    const product = await Product.findById(req.body.productID);
    if (!product) { res.status(400).send('Product Does not exist'); }

    const user = await User.findById(req.user._id);

    // Add product to cart, if already in cart then increment quanitity
    const index = user.cart.findIndex(element => product._id.equals(element.productID));
    if (index < 0) { 
        const item = {
            productID: product,
            quantity: 1
        };
        user.cart.push(item);
    } else { 
        user.cart[index].quantity++;
    }

    await user.save();
    res.send(user);
});

router.delete('/remove', isLoggedIn, async (req, res) => {
    // Check is given product exists
    const product = await Product.findById(req.body.productID);
    if (!product) { res.status(400).send('Product Does not exist'); }

    // Get user mongoose model
    const user = await User.findById(req.user._id);
    
    // Find product to remove and check if present in cart
    const index = user.cart.findIndex(element => product._id.equals(element.productID));
    if (index < 0) { return res.status(400).send('Product not in cart'); }

    // Decrement quantity, if quantity is 0 then remove item from cart
    user.cart[index].quantity--;
    if (user.cart[index].quantity === 0) { user.cart.splice(index, 1); }

    await user.save();
    res.send(user);

});

module.exports = router;