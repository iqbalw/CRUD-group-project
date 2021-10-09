const router = require('express').Router();
const Product = require('../models/Products');
const User = require('../models/User');
const { isLoggedIn } = require('../controllers/middleware/verifyUser');

router.get('/', isLoggedIn, (req, res) => {
    console.log(req.user);
    res.send(req.user.cart);
});

router.post('/add', isLoggedIn, async (req, res) => {
    // Check if given product exists
    const product = await Product.findById(req.body.productID);
    if (!product) { res.status(400).send('Product Does not exist'); }

    const user = await User.findById(req.user._id);
    user.cart.push(product);
    await user.save();
    res.send(user);
});

router.delete('/remove', isLoggedIn, async (req, res) => {
    // Check is given product exists
    const product = await Product.findById(req.body.productID);
    if (!product) { res.status(400).send('Product Does not exist'); }

    // Get user mongoose model
    const user = await User.findById(req.user._id);
    
    // Remove product from cart
    const removeIndex = user.cart.findIndex(element => product._id.equals(element));
    user.cart.splice(removeIndex, 1);

    await user.save();
    res.send(user);

});

module.exports = router;