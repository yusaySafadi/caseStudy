const cuisineModel = require('../models/cuisineModel');
const {response} = require("express");
const req = require("express/lib/request");

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
async function deleteCuisine(req, res) {
    const {id} = req.params;
    try {
        const result = await cuisineModel.deleteCuisine(id);
        if (result) {
            res.status(200).json({message: 'Successfully deleted cuisine'});
        } else{
            res.status(404).send('Cuisine not found');
        }
    }catch (err) {
        console.error('Error deleting restaurant', err)
        response.status(500).send('Failed to delete restaurant by id');

    }
}
async function updateCuisine(req, res) {
    const {id} = req.params;
    const {name} = req.body;
    try{
        const updatedCuisine = await cuisineModel.updateCuisines(id, {name})
        if(updatedCuisine){
            res.status(200).json({message: 'Successfully updated cuisine'});
        } else{
            res.status(404).send('Cuisine not found');
        }
    } catch (e) {
        console.error('Error updating cuisine', e);
        response.status(500).send('Failed to update cuisine.');
    }

}
async function addCuisine(req, res){
    const {id} = req.params;
    const {name} = req.body;
    try{
        const cuisine = await  cuisineModel.insertCuisine({name});
        res.status(200).json({message: 'Cuisine successfully added!'},cuisine);
    } catch (err){
        console.error('Error adding cuisine', err);
        response.status(500).send('Failed to add cuisine.');
    }
}
module.exports = {
    getAllCuisines,
    getCuisineById,
    deleteCuisine,
    updateCuisine,
    addCuisine
}