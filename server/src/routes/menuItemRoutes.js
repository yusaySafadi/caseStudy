const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const basicAuthMiddleware = require('../middlewares/basicAuth');
const isAdminMiddleware = require("../middlewares/isAdmin");

router.get('/menu_items/:menu_id',  menuItemController.getMenuItems);

router.post('/menu_items', basicAuthMiddleware,isAdminMiddleware, menuItemController.addMenuItem);
router.put('/menu_items', basicAuthMiddleware,isAdminMiddleware, menuItemController.updateMenuItem);
router.delete('/menu_items/:item_id', basicAuthMiddleware,isAdminMiddleware, menuItemController.deleteMenuItem);

module.exports = router;
