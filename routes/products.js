const router = require('express').Router();
const {isLoggedIn } = require('../controllers/middleware/verifyUser');

// Protected route example/test
router.get('/', isLoggedIn, (req, res) => {
    res.send(`${req.user.name} is Logged in`);
});


module.exports = router;