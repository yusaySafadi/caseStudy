const locationService = require('../services/locationService');
const locationModel = require('../models/locationModel');

async function addLocation(req, res) {
    const {street, houseNumber, city, postalCode, country, additionalInfo, state} = req.body;

    try {
        //use service to find or create the location
        const location = await locationService.findOrCreateLocation({
            street,
            houseNumber,
            city,
            postalCode,
            country,
            additionalInfo
        });

        res.status(201).json({message: 'Location successfully added!', location});
    } catch (error) {
        console.error('Error adding location:', error);
        res.status(500).json({error: 'Failed to add location. Please try again later.'});
    }
}

async function getAllLocations(req, res) {
    try {
        const locations = await locationModel.getAllLocations()
        res.status(200).json(locations);
    } catch (error) {
        console.error('Error getting locations:', error);
        res.status(500).json({error: 'Failed to fetch locations'});
    }
}
async function getLocationById(req, res) {
    const {id} = req.params;
    try {
        const location = await locationModel.getLocationById(id);
        res.status(200).json(location);
    } catch (err) {
        console.error('Error deleting restaurant', err);
        res.status(500).json({error: 'Failed to get location. Please try again later.'});
    }
}

async function updateLocation(req, res) {
    const {id} = req.params;
    const {street, houseNumber, city, postalCode, country, state, additionalInfo} = req.body;
    try {
        const updatedLocation = await locationModel.updateLocation(id, {
            street,
            houseNumber,
            city,
            postalCode,
            country,
            state,
            additionalInfo
        });
        if (updatedLocation) {
            res.status(200).json({message: 'Location successfully updated!', location: updatedLocation});
        } else {
            res.status(404).send('Location not found!');
        }
    } catch (err) {
        console.error('Error updating location', err);
        res.status(500).send('Failed to update location');
    }
}

async function deleteLocation(req, res) {
    const {id} = req.params;
    try {
        const result = await locationModel.deleteLocation(id);
        if (result) {
            res.status(200).json({message: 'Location successfully deleted!', location: result});
        } else {
            res.status(404).send('No restaurant found');
        }
    } catch (err) {
        console.error('Error deleting restaurant', err);
        res.status(500).send('Failed to delete location. Please try again later.');
    }
}

module.exports = {
    addLocation,
    updateLocation,
    deleteLocation,
    getLocationById,
    getAllLocations
}