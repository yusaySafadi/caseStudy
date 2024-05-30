const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');

router.post('/menu_items', menuItemController.addMenuItem);
router.get('/menu_items/:menu_id', menuItemController.getMenuItems);
router.put('/menu_items', menuItemController.updateMenuItem);
router.delete('/menu_items/:item_id', menuItemController.deleteMenuItem);

module.exports = router;
