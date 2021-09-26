const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', {
        pageTitle: "Home", 
        user: req.user,
    });
});


module.exports = router;