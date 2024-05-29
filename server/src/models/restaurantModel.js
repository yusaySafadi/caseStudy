const db = require('../db');

//return all restaurants from database
function getAllRestaurants() {
    return db.any('SELECT * FROM restaurants');
}
// Add a new restaurant to database
function addRestaurant(restaurantData) {
    return db.none('INSERT INTO restaurants (name,location_id,description) VALUES ($1, $2, $3)',
        [restaurantData.name,restaurantData.location_id, restaurantData.description]);
}

module.exports = {
    getAllRestaurants,
    addRestaurant,
};