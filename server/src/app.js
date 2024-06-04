const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const basicAuthMiddleware = require('./middlewares/basicAuth');
const isAdminMiddleware = require("./middlewares/isAdmin");

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions))
//import routes
const restaurantRoutes = require('./routes/restaurantRoutes');
const locationRoutes = require('./routes/locationRoutes');
const cuisineRoutes = require('./routes/cuisineRoutes');
const menuRoutes = require('./routes/menuRoutes')
const menuItemRoutes  = require('./routes/menuItemRoutes')
app.use(express.json()) //For parsing application/json

app.use('/api', restaurantRoutes)
app.use('/api', locationRoutes)
app.use('/api', cuisineRoutes)
app.use('/api', menuRoutes)
app.use('/api', menuItemRoutes)
app.get('/api/admin', basicAuthMiddleware, isAdminMiddleware, (req, res) => {
    res.json({ role: 'admin' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
