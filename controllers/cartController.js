const Product = require('../models/Products');
const User = require('../models/User');

/**
 * Render the Cart page for the current authenticated
 * user. The rendered page will display all products
 * on the users cart.
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
module.exports.getCartPage = async (req, res) => {
    const user = await User.findById(req.user._id).populate('cart.productID');
    res.render('cart', {
        user: user,
        cart: user.cart,
        pageTitle: "Shopping Cart"
    });
}

/**
 * Adds the given product to the users cart. The product is specified
 * using the product ID. If the product already exists in the cart then
 * the quantity will be incremented. A bad request error will be sent if
 * the specified product doesn't exist.
 * @param {Object} req The request object
 * @param {Object} res The response object 
 */
module.exports.addToCart = async (req, res) => {
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
    // if user adding to cart from another page then don't redirect
    if (!req.body.onCartPage) { return res.status(201).json(user.cart); }
    res.redirect('/cart');
}

/**
 * Removes the given product from the user's cart, if the product 
 * already exists in the cart then quanitity will be decremented.
 * Product will be removed from the array if the quantity results
 * to 0. Will return a bad request if the specified product is not
 * found in the database and/or the user's cart.
 * @param {Object} req The request object
 * @param {Object} res The response object 
 */
module.exports.removeFromCart = async (req, res) => {
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
    res.redirect('/cart');

}

/**
 * Removes a product from the cart array regardless of the quanitity.
 * Will return a bad request if the specified product is not in the 
 * cart or it doesn't exist. The product is specified through the 
 * request body by its ID. Upon success will redirect back to the
 * user's cart page.
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
module.exports.removeAllFromCart = async (req, res) => {
    // Check is given product exists
    console.log(req);
    const product = await Product.findById(req.body.productID);
    if (!product) { res.status(400).send('Product Does not exist'); }

    // Get user mongoose model
    const user = await User.findById(req.user._id);
    
    // Find product to remove and check if present in cart
    const index = user.cart.findIndex(element => product._id.equals(element.productID));
    if (index < 0) { return res.status(400).send('Product not in cart'); }

    user.cart.splice(index, 1);
    
    await user.save();
    res.redirect(303,'/cart');
}