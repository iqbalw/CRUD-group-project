const Product = require("../models/Products");
const router = require("express").Router();
const controller = require('../controllers/productController');

router.get("/", controller.getProducts);


module.exports = router;
