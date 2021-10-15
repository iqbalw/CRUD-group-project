const router = require("express").Router();
const controller = require("../controllers/productController");
const { productValidation } = require('../controllers/middleware/dataValidation.js');
const { isLoggedIn, isAdmin } = require("../controllers/middleware/verifyUser");
 
// package used for image uploads
const multer = require('multer'); 

// Upload specifications
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, new Date().toISOString() + file.originalname) 
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // accept file
    } else {
        cb(null, false); // reject file
    }
}
const limits = { fileSize: 1024 * 1024 * 9 } // 9MB 

// middleware to parse multipart/form-data
const upload = multer({storage, limits, fileFilter});

// @desc    Render Add product page
// @route   GET /products/add
router.get("/add", isLoggedIn, isAdmin, controller.getProductPage);

// @desc    Render Edit Products Page
// @route   GET /products/edit
router.get("/edit", isLoggedIn, isAdmin, controller.getEditPage);

// @desc    Get product by ID
// @route   GET /products/:id
router.get("/:id", isLoggedIn, controller.getProduct);

// @desc    Add a new product to the database
// @route   POST /products/add
router.post('/add', isLoggedIn, isAdmin, upload.single('productImage'), productValidation, controller.addProduct);

// @desc    Update a product currently in the database
// @route   PUT /products/edit
router.put('/edit', isLoggedIn, isAdmin, upload.single('productImage'), controller.editProduct);

// @desc    Remove a product currently in the database
// @route   DELETE /products/delete
router.delete('/delete', isAdmin, controller.deleteProduct);

module.exports = router;
