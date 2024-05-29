const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const restaurantRoutes = require('./routes/restaurantRoutes');
app.use(express.json()) //For parsing application/json
app.use('/api', restaurantRoutes)
console.log(typeof process.env.DB_PASSWORD);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
