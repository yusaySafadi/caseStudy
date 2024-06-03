const basicAuthMiddleware = require('../middlewares/basicAuth');

// Middleware to check for admin role
const adminUsername = process.env.ADMIN_USERNAME;
const isAdminMiddleware = (req, res, next) => {
    const user = req.auth;
    if (user && user.user === adminUsername) {
        next();
    } else {
        res.sendStatus(403);
    }
};
module.exports = isAdminMiddleware