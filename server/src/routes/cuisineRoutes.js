const express = require('express');
const router = express.Router();
const cuisineController = require('../controllers/cuisineController');
const basicAuthMiddleware = require('../middlewares/basicAuth');

router.get('/cuisines/', cuisineController.getAllCuisines)
router.get('/cuisines/:id', cuisineController.getCuisineById);

router.post('/cuisines/',basicAuthMiddleware,cuisineController.addCuisine)
router.put('/cuisines/:id', basicAuthMiddleware,cuisineController.updateCuisine)
router.delete('/cuisines/:id',basicAuthMiddleware, cuisineController.deleteCuisine);

module.exports = router;