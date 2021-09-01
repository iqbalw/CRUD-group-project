const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Index Route');
});


module.exports = router;