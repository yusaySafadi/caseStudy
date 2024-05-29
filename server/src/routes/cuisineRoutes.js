const express = require('express');
const router = express.Router();
const cuisineController = require('../controllers/cuisineController');

router.get('/cuisines/', cuisineController.getAllCuisines)
router.get('/cusines/:id', cuisineController.getCuisineById);

module.exports = router;