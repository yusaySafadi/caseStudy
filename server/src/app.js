const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
