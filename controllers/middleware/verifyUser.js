/**
 * Check if the current user is authenticated
 * and logged into a session. This middleware 
 * is used to block access to protected routes
 * for unauthenticated users.
 * @param {Object} req The Request Object 
 * @param {Object} res The Respose Object
 * @param {Callback} next The next middleware function 
 */
module.exports.isLoggedIn = (req, res, next) => {
    req.isAuthenticated() ? next() : res.status(401).redirect('/auth/login');
}

/**
 * Check if the current user is not authenticated
 * and logged into a session. This middleware 
 * is used to block access to routes that grant
 * authentication. e.g. Users shouldn't be able to
 * access the register and login pages/routes if 
 * they are already logged into a session.
 * @param {Object} req The Request Object 
 * @param {Object} res The Respose Object
 * @param {Callback} next The next middleware function
 */
module.exports.isNotLoggedIn = (req, res, next) => {
    req.isAuthenticated() ? res.status(400).redirect('/') : next();
}

/**
 * Checks if the current user is an Admin. If not then the 
 * user will be redirected back to the index page.
 * @param {Object} req The Request Object
 * @param {Object} res The Response Object
 * @param {Callback} next The middleware function
 */
module.exports.isAdmin = (req, res, next) => {
    req.user.isAdmin ? next() : res.status(400).redirect('/');
}