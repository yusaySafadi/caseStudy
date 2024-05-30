const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const basicAuthMiddleware = require('../middlewares/basicAuth');

router.get('/menus/:restaurant_id', menuController.getMenus);

router.post('/menus',basicAuthMiddleware, menuController.addMenu);
router.put('/menus',basicAuthMiddleware, menuController.updateMenu);
router.delete('/menus/:menu_id',basicAuthMiddleware, menuController.deleteMenu);

module.exports = router;
