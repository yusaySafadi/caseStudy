const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const basicAuthMiddleware = require('../middlewares/basicAuth');
const isAdminMiddleware = require("../middlewares/isAdmin");

router.get('/locations', locationController.getAllLocations);

router.post('/locations',basicAuthMiddleware,isAdminMiddleware,  locationController.addLocation);
router.put('/locations/:id',basicAuthMiddleware,isAdminMiddleware,  locationController.updateLocation);
router.delete('/locations/:id', basicAuthMiddleware,isAdminMiddleware, locationController.deleteLocation);

module.exports = router;
