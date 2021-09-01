const router = require('express').Router();

router.get('/login', (req, res) =>{
    res.redirect('/login.html');
});

router.post('/login', (req, res) => {
    res.send(req.body);
});

router.get('/register', (req, res) => {
    res.redirect('/register.html');
});

router.post('/register', (req, res) => {
    res.send(req.body);
});


module.exports = router;