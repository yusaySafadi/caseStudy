const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurantController');
const basicAuthMiddleware = require('../middlewares/basicAuth');

router.get('/restaurants', restaurantsController.getAllRestaurants);
router.get('/restaurants/:id', restaurantsController.getRestaurantById);

router.post('/restaurants',basicAuthMiddleware, restaurantsController.addRestaurant);
router.put('/restaurants/:id',basicAuthMiddleware, restaurantsController.updateRestaurant);
router.delete('/restaurants/:id',basicAuthMiddleware, restaurantsController.deleteRestaurant);

module.exports = router;
