const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurantsController');

router.get('/restaurants', restaurantsController.getAllRestaurants);
router.post('/restaurants', restaurantsController.addRestaurant);

module.exports = router;
