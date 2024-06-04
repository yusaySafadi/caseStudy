const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const basicAuthMiddleware = require('../middlewares/basicAuth');
const isAdminMiddleware = require('../middlewares/isAdmin');
/**
 * @swagger
 * tags:
 *  name: Menus
 *  description: Menu management
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       required:
 *         - restaurant_id
 *         - name
 *       properties:
 *         menu_id:
 *           type: integer
 *           description: The unique ID of the menu
 *         restaurant_id:
 *           type: integer
 *           description: The ID of the restaurant to which this menu belongs
 *         name:
 *           type: string
 *           description: The name of the menu
 *       example:
 *         menu_id: 1
 *         restaurant_id: 103
 *         name: "Dinner Menu"
 */

/**
 * @swagger
 * /api/menus/{restaurant_id}:
 *   get:
 *     summary: Get all menus for a specific restaurant
 *     tags: ['Menus']
 *     parameters:
 *       - name: restaurant_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the restaurant
 *     responses:
 *       200:
 *         description: A list of menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Restaurant not found
 */
router.get('/menus/:restaurant_id', menuController.getMenus);

/**
 * @swagger
 * /api/menus:
 *   post:
 *     summary: Create a new menu
 *     tags: ['Menus']
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       201:
 *         description: Menu created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       401:
 *         description: Unauthorized
 */
router.post('/menus', basicAuthMiddleware, isAdminMiddleware, menuController.addMenu);

/**
 * @swagger
 * /api/menus:
 *   put:
 *     summary: Update a menu
 *     tags: ['Menus']
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: Menu updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Menu not found
 */
router.put('/menus', basicAuthMiddleware, isAdminMiddleware, menuController.updateMenu);

/**
 * @swagger
 * /api/menus/{menu_id}:
 *   delete:
 *     summary: Delete a menu by ID
 *     tags: ['Menus']
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - name: menu_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the menu
 *     responses:
 *       204:
 *         description: Menu deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Menu not found
 */
router.delete('/menus/:menu_id', basicAuthMiddleware, isAdminMiddleware, menuController.deleteMenu);

module.exports = router;
