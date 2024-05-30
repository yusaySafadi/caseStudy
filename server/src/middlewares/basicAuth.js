const expressBasicAuth = require('express-basic-auth');

const basicAuthMiddleware = expressBasicAuth({
    users:{[process.env.ADMIN_USERNAME]:process.env.ADMIN_PASSWORD},
    challenge: true,
    unauthorizedResponse: (req) => 'Unauthorized'
});

module.exports = basicAuthMiddleware;