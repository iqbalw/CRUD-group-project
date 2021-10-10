const Product = require("../models/Products");

/**
 * Renders the add product page
 * @param {Object} req The Request Object 
 * @param {Object} res The Response Object
 */
 module.exports.getProductPage = (req, res) => {
  const errorMessage = req.session.message;
  req.session.message = null; // reset error message
  res.render("add", {
    pageTitle: "Add Product",
    user: req.user,
    error: errorMessage
  });
}

/**
 * Retrieves products from the database
 * @param {Object} req The Request Object 
 * @param {Object} res The Response Object
 */
module.exports.getProducts = async (req, res) => {
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
}

/**
 * Retrieves a specific product from the database
 * @param {Object} req The Request Object 
 * @param {Object} res The Response Object
 */
module.exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find({ name: req.params.name });
    res.send(products);
  } catch (err) {
    res.status(400).send("No products retrieved.");
  }
}

/**
 * Creates a product to the database
 * @param {Object} req The Request Object 
 * @param {Object} res The Response Object
 */
module.exports.addProduct = async (req, res) => {
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
}