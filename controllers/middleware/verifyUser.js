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
    req.isAuthenticated() ? next() : res.sendStatus(401);
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