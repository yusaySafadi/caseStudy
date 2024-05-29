const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
//import routes
const restaurantRoutes = require('./routes/restaurantRoutes');
const locationRoutes = require('./routes/locationRoutes');

app.use(express.json()) //For parsing application/json

app.use('/api', restaurantRoutes)
app.use('/api', locationRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
