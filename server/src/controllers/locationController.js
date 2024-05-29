const locationService = require('../services/locationService');

async function addLocation(req,res) {
    const { street, houseNumber, city, postalCode, country, additionalInfo, state} = req.body;

    try{
        //use service to find or create the location
        const location =await locationService.findOrCreateLocation({street, houseNumber, city, postalCode, country, additionalInfo});

        res.status(201).json({message: 'Location successfully added!', location});
    } catch (error){
        console.error('Error adding location:', error);
        res.status(500).json({ error: 'Failed to add location. Please try again later.' });
    }
}

module.exports = {
    addLocation
}