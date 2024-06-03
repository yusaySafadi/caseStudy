const expressBasicAuth = require('express-basic-auth');

const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;
const basicAuthMiddleware = expressBasicAuth({
    users:{[adminUsername]: adminPassword},
    challenge: true,
    unauthorizedResponse: (req) => 'Unauthorized'
});

module.exports = basicAuthMiddleware;