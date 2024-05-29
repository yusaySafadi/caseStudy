const restaurantModel = require("../models/restaurantModel");
const locationService = require("../services/locationService");


async function getAllRestaurants(req, res) {
    try{
        const data = await restaurantModel.getAllRestaurants();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).send('Failed to retrieve restaurants ' + err);
    }
}

async function addRestaurant(req, res) {
    const {name,description,street,houseNumber,city,postalCode, country, additionalInfo,state} = req.body;

    try {

        //Use service to find or create a location
        const location = await locationService.findOrCreateLocation({street, houseNumber, city, postalCode, country, state, additionalInfo});

        //Insert the restaurant with the location_id
        const newRestaurant ={
            name,
            description,
            locationId: location.location_id,
        };
        const insertedRestaurant = await restaurantModel.addRestaurant(newRestaurant);


        res.status(201).json({message:'Successfully added restaurant', restaurant: insertedRestaurant});
    } catch (err){
        console.error('Error adding restaurant:', err);
        res.status(500).json({error:'Failed to add restaurant'});
    }
}

module.exports = {
    getAllRestaurants,
    addRestaurant
}