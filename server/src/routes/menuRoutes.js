const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const basicAuthMiddleware = require('../middlewares/basicAuth');
const isAdminMiddleware = require("../middlewares/isAdmin");

router.get('/menus/:restaurant_id', menuController.getMenus);

router.post('/menus',basicAuthMiddleware,isAdminMiddleware, menuController.addMenu);
router.put('/menus',basicAuthMiddleware,isAdminMiddleware, menuController.updateMenu);
router.delete('/menus/:menu_id',basicAuthMiddleware,isAdminMiddleware, menuController.deleteMenu);

module.exports = router;
