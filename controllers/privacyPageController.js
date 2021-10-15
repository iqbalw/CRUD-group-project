/**
 * Renders the add product page
 * @param {Object} req The Request Object
 * @param {Object} res The Response Object
 */
 module.exports.getPrivacyPage = (req, res) => {
    let errorMessage = null;
    if (req.session.message) {
      errorMessage = req.session.message;
      req.session.message = null; // reset error message
    }
    res.render("privacy", {
      pageTitle: "Privacy Policy",
      user: req.user,
      error: errorMessage,
    });
  };