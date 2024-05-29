const restaurantModel = require("../models/restaurantModel");
const locationModel = require("../models/locationModel");
const {geocodeAddress} = require("../services/geocode");

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
        //Check if the location already exists in the database
         let location = await locationModel.findLocation({street, houseNumber, city, postalCode, country});

        //if the location does not exist in the database, geode and insert it
        if (!location) {
            const coordinates = await geocodeAddress({street, houseNumber, city, postalCode, country});
            if(!coordinates) {
                return res.status(400).json({ error: 'Geolocation not found for the specified address.' });
            }
            const newLocation ={
                street,
                city,
                state: state || '',
                country,
                postalCode,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                additionalInfo,
                houseNumber
            };
            location = await locationModel.insertLocation(newLocation);
        }

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