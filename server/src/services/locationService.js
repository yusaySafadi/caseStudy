const {geocodeAddress} = require('../services/geocode');
const locationModel = require('../models/locationModel');

async function findOrCreateLocation(locationData) {
    const { street, houseNumber, city, postalCode, country, state, additionalInfo } = locationData;

    // Check if the location already exists in the database
    let location = await locationModel.findLocation(street, houseNumber, city, postalCode, country);

    // If location doesn't exist, geocode and insert it
    if (!location) {
        const coordinates = await geocodeAddress({ street, houseNumber, city, postalCode, country });
        if (!coordinates) {
            throw new Error('Geolocation not found for the specified address.');
        }
        const newLocation = {
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

    return location;
}

module.exports = {
    findOrCreateLocation
}