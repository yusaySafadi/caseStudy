const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const basicAuthMiddleware = require('../middlewares/basicAuth');

router.get('/menu_items/:menu_id',  menuItemController.getMenuItems);

router.post('/menu_items', basicAuthMiddleware, menuItemController.addMenuItem);
router.put('/menu_items', basicAuthMiddleware, menuItemController.updateMenuItem);
router.delete('/menu_items/:item_id', basicAuthMiddleware, menuItemController.deleteMenuItem);

module.exports = router;
