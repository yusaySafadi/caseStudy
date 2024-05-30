const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const basicAuthMiddleware = require('../middlewares/basicAuth');

router.get('/locations', locationController.getAllLocations);

router.post('/locations',basicAuthMiddleware, locationController.addLocation);
router.put('/locations/:id',basicAuthMiddleware, locationController.updateLocation);
router.delete('/locations/:id', basicAuthMiddleware,locationController.deleteLocation);

module.exports = router;
