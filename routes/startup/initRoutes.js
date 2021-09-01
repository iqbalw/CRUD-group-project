const indexRoute = require('../index');
const authRoute = require('../auth');
const productRoute = require('../products');

module.exports = (app) => {
    app.use('/', indexRoute);
    app.use('/auth', authRoute);
    app.use('/products', productRoute);
}