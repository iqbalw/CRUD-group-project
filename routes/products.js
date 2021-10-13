const router = require("express").Router();
const controller = require("../controllers/productController");
const { productValidation } = require('../controllers/middleware/dataValidation.js');
const { isLoggedIn } = require("../controllers/middleware/verifyUser");
// middleware to parse multipart/form-data 
// package used for image uploads
const multer = require('multer'); 

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

const upload = multer({storage, limits, fileFilter});

// @desc    Render Login Page
// @route   GET /products/add
router.get("/add", isLoggedIn, controller.getProductPage);

// @desc    Render Edit Products Page
// @route   GET /products/edit
router.get("/edit", isLoggedIn, controller.getEditPage);

router.get("/", isLoggedIn, controller.getProducts);

router.get("/:id", isLoggedIn, controller.getProduct);

router.post('/add', upload.single('productImage'), productValidation, controller.addProduct);

router.put('/edit', isLoggedIn, controller.editProduct);

router.delete('/delete', controller.deleteProduct);

module.exports = router;
