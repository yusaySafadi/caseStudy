const db = require("../db");


function addCuisineToRestaurant(restaurantId,cuisineId){
    return db.none('INSERT INTO restaurantcuisines (restaurant_id, cuisine_id) VALUES ($1,$2)', [restaurantId, cuisineId]);
}
function getCuisinesForRestaurant(restaurantId){
    return db.any(`
    Select c.cuisine_id, c.name
    FROM cuisines c 
    JOIN restaurantcuisines rc ON c.cuisine_id = rc.cuisine_id
    WHERE rc.restaurant_id = $1`, [restaurantId])
}

module.exports = {
    addCuisineToRestaurant,
    getCuisinesForRestaurant,
}