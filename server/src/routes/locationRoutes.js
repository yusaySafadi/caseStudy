const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

//router.get('/locations', restaurantsController.getAllRestaurants);
router.post('/locations', locationController.addLocation);

module.exports = router;
