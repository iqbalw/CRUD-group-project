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