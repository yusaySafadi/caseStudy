const {geocodeAddress} = require('../services/geocode');
const locationModel = require('../models/locationModel');

async function addLocation(req,res) {
    const { street, houseNumber, city, postalCode, country, additionalInfo } = req.body;
    try{
        //Check if the location already exists in the database
        const existingLocation = await locationModel.findLocation(street, houseNumber, city, postalCode, country);
        if (existingLocation) {
            return res.status(409).json({ error: 'Location already exists.' });
        }
        //Geocode the address to get the coordinates
        const coordinates = await geocodeAddress({street, houseNumber, city, postalCode, country});
        if (!coordinates) {
            return res.status(400).json({ error: 'Geolocation not found for the specified address.' });
        }

        //Insert the new location into the database
        const newLocation ={
            street,
            city,
            state:req.body.state || '',
            country,
            postalCode,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            additionalInfo,
            houseNumber
        }
        const insertedLocation = await locationModel.insertLocation(newLocation);

        res.status(201).json({message: 'Location successfully added!', location: insertedLocation});

    } catch (error){
        console.error('Error adding location:', error);
        res.status(500).json({ error: 'Failed to add location. Please try again later.' });
    }
}

module.exports = {
    addLocation
}