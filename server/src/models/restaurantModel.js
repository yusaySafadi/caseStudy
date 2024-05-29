const db = require('../db');

//return all restaurants from database
function getAllRestaurants() {
    return db.any('SELECT * FROM restaurants');
}
// Adds a new restaurant to the database
// Params: restaurantData - Object containing name, location_id, and description of the restaurant
// Returns: Promise resolving to the new restaurant entry
function addRestaurant(restaurantData) {
    return db.none('INSERT INTO restaurants (name,location_id,description) VALUES ($1, $2, $3)',
        [restaurantData.name,restaurantData.location_id, restaurantData.description]);
}

module.exports = {
    getAllRestaurants,
    addRestaurant,
};