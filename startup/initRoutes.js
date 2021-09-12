const indexRoute = require('../routes/index');
const authRoute = require('../routes/auth');
const productRoute = require('../routes/products');

module.exports = (app) => {
    app.use('/', indexRoute);
    app.use('/auth', authRoute);
    app.use('/products', productRoute);
}