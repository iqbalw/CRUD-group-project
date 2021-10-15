const router = require("express").Router();
const controller = require('../controllers/privacyPageController');

router.get("/", controller.getPrivacyPage);


module.exports = router;
