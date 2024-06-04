const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurantController');
const basicAuthMiddleware = require('../middlewares/basicAuth');
const isAdminMiddleware = require('../middlewares/isAdmin');
/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Restaurant management
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         restaurant_id:
 *           type: integer
 *           description: The unique ID of the restaurant
 *         name:
 *           type: string
 *           description: The name of the restaurant
 *         description:
 *           type: string
 *           description: The description of the restaurant
 *         street_address:
 *           type: string
 *           description: The street address of the restaurant
 *         house_number:
 *           type: string
 *           description: The house number of the restaurant
 *         city:
 *           type: string
 *           description: The city where the restaurant is located
 *         state:
 *           type: string
 *           description: The state where the restaurant is located
 *         country:
 *           type: string
 *           description: The country where the restaurant is located
 *         postal_code:
 *           type: string
 *           description: The postal code of the restaurant
 *         latitude:
 *           type: string
 *           description: The latitude of the restaurant
 *         longitude:
 *           type: string
 *           description: The longitude of the restaurant
 *         additional_info:
 *           type: string
 *           description: Additional information about the restaurant
 *         cuisines:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Cuisine'
 *       example:
 *         restaurant_id: 103
 *         name: "Yusys Cha No Ma"
 *         description: "Eine kleine ausnahme"
 *         street_address: "Theaterstraße"
 *         house_number: "2"
 *         city: "Hannover"
 *         state: "Niedersachsen"
 *         country: "Germany"
 *         postal_code: "30167"
 *         latitude: "52.373670"
 *         longitude: "9.742360"
 *         additional_info: "Neben dem Theater"
 *         cuisines:
 *           - cuisine_id: 1
 *             name: "asian"
 *           - cuisine_id: 2
 *             name: "Mediterranean"
 *     Cuisine:
 *       type: object
 *       properties:
 *         cuisine_id:
 *           type: integer
 *           description: The unique ID of the cuisine
 *         name:
 *           type: string
 *           description: The name of the cuisine
 *       example:
 *         cuisine_id: 1
 *         name: "Asian"
 */

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Returns a list of restaurants
 *     tags: ['Restaurants']
 *     responses:
 *       200:
 *         description: A list of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 */
router.get('/restaurants', restaurantsController.getAllRestaurants);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     tags: ['Restaurants']
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the restaurant
 *     responses:
 *       200:
 *         description: A single restaurant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 */
router.get('/restaurants/:id', restaurantsController.getRestaurantById);

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: ['Restaurants']
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       401:
 *         description: Unauthorized
 */
router.post('/restaurants', basicAuthMiddleware, isAdminMiddleware, restaurantsController.addRestaurant);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   put:
 *     summary: Update a restaurant by ID
 *     tags: ['Restaurants']
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Restaurant updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Restaurant not found
 */
router.put('/restaurants/:id', basicAuthMiddleware, isAdminMiddleware, restaurantsController.updateRestaurant);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     tags: ['Restaurants']
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the restaurant
 *     responses:
 *       204:
 *         description: Restaurant deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Restaurant not found
 */
router.delete('/restaurants/:id', basicAuthMiddleware, isAdminMiddleware, restaurantsController.deleteRestaurant);

module.exports = router;
