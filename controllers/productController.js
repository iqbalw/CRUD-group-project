const Product = require("../models/Products");

/**
 * Renders the add product page
 * @param {Object} req The Request Object
 * @param {Object} res The Response Object
 */
module.exports.getProductPage = (req, res) => {
  let errorMessage = null;
  if (req.session.message) {
    errorMessage = req.session.message;
    req.session.message = null; // reset error message
  }
  res.render("add", {
    pageTitle: "Add Product",
    user: req.user,
    error: errorMessage,
  });
};

/**
 * Renders the edit products page
 * @param {Object} req The Request Object
 * @param {Object} res The Response Object
 */
module.exports.getEditPage = async (req, res) => {
  const products = await Product.find();

  let errorMessage = null;
  if (req.session.message) {
    errorMessage = req.session.message;
    req.session.message = null; // reset error message
  }
  res.render("edit", {
    pageTitle: "Edit Products",
    user: req.user,
    products: products,
    error: errorMessage,
  });
};

/**
 * Retrieves products from the database
 * @param {Object} req The Request Object
 * @param {Object} res The Response Object
 */
module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("index", {
      products: products.name,
      user: req.user,
    });
  } catch (err) {
    res.status(500).send("No products retrieved.");
  }
};

/**
 * Retrieves a specific product from the database
 * @param {Object} req The Request Object
 * @param {Object} res The Response Object
 */
module.exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find({ _id: req.params.id });
    res.send(products);
  } catch (err) {
    res.status(400).send("No products retrieved.");
  }
};

/**
 * Creates a product to the database
 * @param {Object} req The Request Object
 * @param {Object} res The Response Object
 */
module.exports.addProduct = async (req, res) => {
  console.log(req.file);

  // Create New Product
  const product = new Product({
    name: req.body.name,
    description: req.body.desc,
    price: req.body.price,
  });

  // Save Product in Database
  try {
    const savedProduct = await product.save();
    res.redirect('/');
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.editProduct = async (req, res) => {
  console.log(req.body);
  try {
    const query = { 
      _id: req.body._id
     };
    const product = await Product.findOneAndUpdate(query, req.body, {
      upsert: true,
    });
    console.log(product);
    res.status(201).send(req.body);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.deleteProduct = async (req, res) => {
  console.log("DELETE request");
  console.log(req.params);
  try {
    const product = await Product.findOneAndDelete({ _id: req.body._id });
    console.log(product);
    res.status(204);
  } catch (err) {
    res.status(500).json(err);
  }
};
