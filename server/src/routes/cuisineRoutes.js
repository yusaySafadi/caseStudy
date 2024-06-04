const express = require('express');
const router = express.Router();
const cuisineController = require('../controllers/cuisineController');
const basicAuthMiddleware = require('../middlewares/basicAuth');
const isAdminMiddleware = require('../middlewares/isAdmin');
/**
 * @swagger
 * tags:
 *  name: Cuisines
 *  description: Cuisine management
 *
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Cuisine:
 *       type: object
 *       required:
 *         - name
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
 * /api/cuisines/:
 *   get:
 *     summary: Returns a list of cuisines
 *     tags: ['Cuisines']
 *     responses:
 *       200:
 *         description: A list of cuisines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cuisine'
 */
router.get('/cuisines/', cuisineController.getAllCuisines);

/**
 * @swagger
 * /api/cuisines/{id}:
 *   get:
 *     summary: Get a cuisine by ID
 *     tags: ['Cuisines']
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cuisine
 *     responses:
 *       200:
 *         description: A single cuisine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cuisine'
 *       404:
 *         description: Cuisine not found
 */
router.get('/cuisines/:id', cuisineController.getCuisineById);

/**
 * @swagger
 * /api/cuisines/:
 *   post:
 *     summary: Create a new cuisine
 *     tags: ['Cuisines']
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuisine'
 *     responses:
 *       201:
 *         description: Cuisine created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cuisine'
 *       401:
 *         description: Unauthorized
 */
router.post('/cuisines/', basicAuthMiddleware, isAdminMiddleware, cuisineController.addCuisine);

/**
 * @swagger
 * /api/cuisines/{id}:
 *   put:
 *     summary: Update a cuisine by ID
 *     tags: ['Cuisines']
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cuisine
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuisine'
 *     responses:
 *       200:
 *         description: Cuisine updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cuisine'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cuisine not found
 */
router.put('/cuisines/:id', basicAuthMiddleware, isAdminMiddleware, cuisineController.updateCuisine);

/**
 * @swagger
 * /api/cuisines/{id}:
 *   delete:
 *     summary: Delete a cuisine by ID
 *     tags: ['Cuisines']
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cuisine
 *     responses:
 *       204:
 *         description: Cuisine deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cuisine not found
 */
router.delete('/cuisines/:id', basicAuthMiddleware, isAdminMiddleware, cuisineController.deleteCuisine);

module.exports = router;
