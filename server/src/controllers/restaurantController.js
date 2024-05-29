const restaurantModel = require("../models/restaurantModel");

async function getAllRestaurants(req, res) {
    try{
        const data = await restaurantModel.getAllRestaurants();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).send('Failed to retrieve restaurants ' + err);
    }
}

async function addRestaurant(req, res) {
    try {
        await restaurantModel.addRestaurant(req.body);
        res.status(200).send('Successfully added restaurant');
    } catch (err){
        res.status(500).send('Failed to add restaurant');
    }
}

module.exports = {
    getAllRestaurants,
    addRestaurant
}