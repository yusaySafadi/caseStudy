const db = require('../db');

//return all restaurants from database
function getAllRestaurants() {
    return db.any('SELECT * FROM restaurants');
}
// Adds a new restaurant to the database
// Params: restaurantData - Object containing name, location_id, and description of the restaurant
// Returns: Promise resolving to the new restaurant entry
function addRestaurant(restaurant) {
    return db.one(
        'INSERT INTO restaurants (name,location_id,description) VALUES ($1, $2, $3) RETURNING *',
        [restaurant.name,restaurant.locationId, restaurant.description]);
}

function getRestaurantById(id) {
    return db.oneOrNone('SELECT * FROM restaurants WHERE restaurant_id = $1', [id]);
}

function updateRestaurant(id, restaurant) {
    return db.oneOrNone(
        'UPDATE restaurants SET name = $1, description = $2 WHERE restaurant_id = ?',[restaurant.name, restaurant.description,restaurant.id]
    )
}

function deleteRestaurant(id) {
    return db.result('DELETE FROM restaurants where id =$1', [id], r=> r.rowCount)
}

function getAllRestaurantsWithLocations(){
    return db.any(`SELECT
        r.restaurant_id,  
        r.name as restaurant_name,  
        r.description,  
        l.location_id, l.street_address, l.house_number, l.city, 
         l.state, l.country, l.postal_code, l.latitude, l.longitude, l.additional_info 
         FROM restaurants r 
         JOIN locations l ON r.location_id = l.location_id`)
}


module.exports = {
    getAllRestaurants,
    addRestaurant,
    getAllRestaurantsWithLocations,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantById,
};