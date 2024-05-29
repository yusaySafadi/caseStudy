const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurantController');

router.get('/restaurants', restaurantsController.getAllRestaurants);
router.get('/restaurants/:id', restaurantsController.getRestaurantById);
router.post('/restaurants', restaurantsController.addRestaurant);
router.put('/restaurants/:id', restaurantsController.updateRestaurant);
router.delete('/restaurants/:id', restaurantsController.deleteRestaurant);

module.exports = router;
