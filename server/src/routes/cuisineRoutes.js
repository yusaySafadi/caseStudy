const express = require('express');
const router = express.Router();
const cuisineController = require('../controllers/cuisineController');
const basicAuthMiddleware = require('../middlewares/basicAuth');

const isAdminMiddleware = require("../middlewares/isAdmin");

router.get('/cuisines/', cuisineController.getAllCuisines)
router.get('/cuisines/:id', cuisineController.getCuisineById);

router.post('/cuisines/',basicAuthMiddleware,isAdminMiddleware,cuisineController.addCuisine)
router.put('/cuisines/:id', basicAuthMiddleware,isAdminMiddleware,cuisineController.updateCuisine)
router.delete('/cuisines/:id',basicAuthMiddleware,isAdminMiddleware, cuisineController.deleteCuisine);

module.exports = router;