const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const basicAuthMiddleware = require('../middlewares/basicAuth');
const isAdminMiddleware = require('../middlewares/isAdmin');
/**
 * @swagger
 * tags:
 *  name: Locations
 *  description: Location management
 *
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - street_address
 *         - city
 *         - state
 *         - country
 *         - postal_code
 *       properties:
 *         location_id:
 *           type: integer
 *           description: The unique ID of the location
 *         street_address:
 *           type: string
 *           description: The street address of the location
 *         house_number:
 *           type: string
 *           description: The house number of the location
 *         city:
 *           type: string
 *           description: The city where the location is situated
 *         state:
 *           type: string
 *           description: The state where the location is situated
 *         country:
 *           type: string
 *           description: The country where the location is situated
 *         postal_code:
 *           type: string
 *           description: The postal code of the location
 *         latitude:
 *           type: string
 *           description: The latitude of the location
 *         longitude:
 *           type: string
 *           description: The longitude of the location
 *       example:
 *         location_id: 93
 *         street_address: "Theaterstraße"
 *         house_number: "2"
 *         city: "Hannover"
 *         state: "Niedersachsen"
 *         country: "Germany"
 *         postal_code: "30167"
 *         latitude: "52.373670"
 *         longitude: "9.742360"
 */

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Returns a list of locations
 *     tags: ['Locations']
 *     responses:
 *       200:
 *         description: A list of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
router.get('/locations', locationController.getAllLocations);

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Create a new location
 *     tags: ['Locations']
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Location created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       401:
 *         description: Unauthorized
 */
router.post('/locations', basicAuthMiddleware, isAdminMiddleware, locationController.addLocation);

/**
 * @swagger
 * /api/locations/{id}:
 *   put:
 *     summary: Update a location by ID
 *     tags: ['Locations']
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Location not found
 */
router.put('/locations/:id', basicAuthMiddleware, isAdminMiddleware, locationController.updateLocation);

/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     summary: Delete a location by ID
 *     tags: ['Locations']
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the location
 *     responses:
 *       204:
 *         description: Location deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Location not found
 */
router.delete('/locations/:id', basicAuthMiddleware, isAdminMiddleware, locationController.deleteLocation);

module.exports = router;
