const restaurantModel = require("../models/restaurantModel");
const locationService = require("../services/locationService");
const restaurantCuisineModel = require("../models/restaurantCuisineModel");
const {response} = require("express");


async function getAllRestaurants(req, res) {
    try {
        const restaurants = await restaurantModel.getAllRestaurantsWithLocations();

        for (const restaurant of restaurants) {
            restaurant.cuisines = await restaurantCuisineModel.getCuisinesForRestaurant(restaurant.restaurant_id);
        }
        res.status(200).json(restaurants);
    } catch (err) {
        console.error('Error getting all restaurants:', err);
        res.status(500).send('Failed to retrieve restaurants ' + err);
    }
}

async function addRestaurant(req, res) {
    const {name, description, street, houseNumber, city, postalCode, country, additionalInfo, state,cuisines} = req.body;

    try {
        //Use service to find or create a location
        const location = await locationService.findOrCreateLocation({
            street,
            houseNumber,
            city,
            postalCode,
            country,
            state,
            additionalInfo
        });

        //Insert the restaurant with the location_id
        const newRestaurant = {
            name,
            description,
            locationId: location.location_id,
        };
        const insertedRestaurant = await restaurantModel.addRestaurant(newRestaurant);

        if(cuisines && cuisines.length > 0) {
            for (const cuisineId of cuisines){
                await restaurantCuisineModel.addCuisineToRestaurant(insertedRestaurant.restaurant_id,cuisineId)
            }
        }

        res.status(201).json({message: 'Successfully added restaurant', restaurant: insertedRestaurant});
    } catch (err) {
        console.error('Error adding restaurant:', err);
        res.status(500).json({error: 'Failed to add restaurant'});
    }
}

async function getRestaurantById(req, res) {
    const {id} = req.params;
    try {
        const restaurant = await restaurantModel.getRestaurantById(id);
        if (restaurant) {
            res.status(200).json(restaurant);
        } else {
            res.status(404).send('No restaurant found');
        }
    } catch (err) {
        console.error('Error getting restaurant by id', err);
        response.status(500).send('Failed to get restaurant by id');
    }
}

async function updateRestaurant(req, res) {
    const {id} = req.params;
    const {name, description} = req.body;
    try {
        const updatedRestaurant = await restaurantModel.updateRestaurant(id, name, description);
        if (updatedRestaurant) {
            res.status(200).json({message: 'Successfully updated restaurant'});
        } else {
            res.status(404).send('No restaurant found');
        }
    } catch (err) {
        console.error('Error updating restaurant by id', err);
        response.status(500).send('Failed to update restaurant by id');
    }
}

async function deleteRestaurant(req, res) {
    const {id} = req.params;
    try {
        const result = await restaurantModel.deleteRestaurant(id);
        if (result) {
            res.status(200).json({message: 'Successfully deleted restaurant'});
        } else {
            res.status(404).send('No restaurant found');
        }
    } catch (err) {
        console.error('Error deleting restaurant', err)
        response.status(500).send('Failed to delete restaurant by id');
    }
}

module.exports = {
    getAllRestaurants,
    addRestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
}