const express = require('express');
const router = express.Router();
const cuisineController = require('../controllers/cuisineController');

router.get('/cuisines/', cuisineController.getAllCuisines)
router.get('/cuisines/:id', cuisineController.getCuisineById);
router.post('/cuisines/',cuisineController.addCuisine)
router.put('/cuisines/:id', cuisineController.updateCuisine)
router.delete('/cuisines/:id', cuisineController.deleteCuisine);

module.exports = router;