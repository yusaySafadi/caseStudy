const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const basicAuthMiddleware = require('../middlewares/basicAuth');
const isAdminMiddleware = require('../middlewares/isAdmin');
/**
 * @swagger
 * tags:
 *  name: MenuItems
 *  description: MenuItem management
 *
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       required:
 *         - menu_id
 *         - name
 *         - description
 *         - price
 *       properties:
 *         item_id:
 *           type: integer
 *           description: The unique ID of the menu item
 *         menu_id:
 *           type: integer
 *           description: The ID of the menu to which this item belongs
 *         name:
 *           type: string
 *           description: The name of the menu item
 *         description:
 *           type: string
 *           description: The description of the menu item
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the menu item
 *       example:
 *         item_id: 1
 *         menu_id: 1
 *         name: "Spring Rolls"
 *         description: "Crispy rolls with vegetables"
 *         price: 5.99
 */

/**
 * @swagger
 * /api/menu_items/{menu_id}:
 *   get:
 *     summary: Get all menu items for a specific menu
 *     tags: ['MenuItems']
 *     parameters:
 *       - name: menu_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the menu
 *     responses:
 *       200:
 *         description: A list of menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: Menu not found
 */
router.get('/menu_items/:menu_id', menuItemController.getMenuItems);

/**
 * @swagger
 * /api/menu_items:
 *   post:
 *     summary: Create a new menu item
 *     tags: ['MenuItems']
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       201:
 *         description: Menu item created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       401:
 *         description: Unauthorized
 */
router.post('/menu_items', basicAuthMiddleware, isAdminMiddleware, menuItemController.addMenuItem);

/**
 * @swagger
 * /api/menu_items:
 *   put:
 *     summary: Update a menu item
 *     tags: ['MenuItems']
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       200:
 *         description: Menu item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Menu item not found
 */
router.put('/menu_items', basicAuthMiddleware, isAdminMiddleware, menuItemController.updateMenuItem);

/**
 * @swagger
 * /api/menu_items/{item_id}:
 *   delete:
 *     summary: Delete a menu item by ID
 *     tags: ['MenuItems']
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - name: item_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the menu item
 *     responses:
 *       204:
 *         description: Menu item deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Menu item not found
 */
router.delete('/menu_items/:item_id', basicAuthMiddleware, isAdminMiddleware, menuItemController.deleteMenuItem);

module.exports = router;
