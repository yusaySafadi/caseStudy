const cuisineModel = require('../models/cuisineModel');

async function getAllCuisines(req, res) {
    try {
        const cuisines = await cuisineModel.getAllCuisines();
        res.status(200).json(cuisines);
    } catch (error) {
        console.error('Error fetching cuisines:', error);
        res.status(500).json({error: 'Failed to fetch cuisines.'});
    }
}

async function getCuisineById(req, res) {
    const {id} = req.params;
    try{
        const cuisine = await cuisineModel.getCuisineById(id);
        if(cuisine){
            res.status(200).json(cuisine);
        } else{
            res.status(404).send('Cuisine not found');
        }
    } catch (err){
        console.error('Error fetching cuisine', err);
        res.status(500).send('Failed to get cuisine.');
    }
}

module.exports = {
    getAllCuisines,
    getCuisineById
}