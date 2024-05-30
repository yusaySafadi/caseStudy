const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.post('/menus', menuController.addMenu);
router.get('/menus/:restaurant_id', menuController.getMenus);
router.put('/menus', menuController.updateMenu);
router.delete('/menus/:menu_id', menuController.deleteMenu);

module.exports = router;
