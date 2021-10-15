const indexRoute = require('../routes/index');
const authRoute = require('../routes/auth');
const productRoute = require('../routes/products');
const cartRoute = require('../routes/cart');
const privacyRoute = require('../routes/privacy');

module.exports = (app) => {
    app.use('/', indexRoute);
    app.use('/auth', authRoute);
    app.use('/products', productRoute);
    app.use('/cart', cartRoute);
    app.use('/privacy', privacyRoute);
}