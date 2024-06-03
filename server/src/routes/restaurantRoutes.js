const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurantController');
const basicAuthMiddleware = require('../middlewares/basicAuth');
const isAdminMiddleware = require("../middlewares/isAdmin");

router.get('/restaurants', restaurantsController.getAllRestaurants);
router.get('/restaurants/:id', restaurantsController.getRestaurantById);

router.post('/restaurants',basicAuthMiddleware, isAdminMiddleware,restaurantsController.addRestaurant);
router.put('/restaurants/:id',basicAuthMiddleware, isAdminMiddleware,restaurantsController.updateRestaurant);
router.delete('/restaurants/:id',basicAuthMiddleware,isAdminMiddleware, restaurantsController.deleteRestaurant);

module.exports = router;
