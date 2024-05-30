const menuModel = require('../models/menuModel');

async function addMenu(req, res) {
    const { restaurant_id, name } = req.body;
    try {
        const newMenu = await menuModel.insertMenu({ restaurant_id, name });
        res.status(201).json({ message: 'Menu added successfully', menu: newMenu });
    } catch (error) {
        console.error('Error adding menu:', error);
        res.status(500).json({ error: 'Failed to add menu. Please try again later.' });
    }
}

async function getMenus(req, res) {
    const { restaurant_id } = req.params;
    try {
        const menus = await menuModel.getMenusByRestaurant(restaurant_id);
        res.status(200).json(menus);
    } catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({ error: 'Failed to fetch menus. Please try again later.' });
    }
}

async function updateMenu(req, res) {
    const { menu_id, name } = req.body;
    try {
        const updatedMenu = await menuModel.updateMenu({ menu_id, name });
        res.status(200).json({ message: 'Menu updated successfully', menu: updatedMenu });
    } catch (error) {
        console.error('Error updating menu:', error);
        res.status(500).json({ error: 'Failed to update menu.' });
    }
}

async function deleteMenu(req, res) {
    const { menu_id } = req.params;
    try {
        const deletedMenu = await menuModel.deleteMenu(menu_id);
        res.status(200).json({ message: 'Menu deleted successfully', menu: deletedMenu });
    } catch (error) {
        console.error('Error deleting menu:', error);
        res.status(500).json({ error: 'Failed to delete menu.' });
    }
}

module.exports = {
    addMenu,
    getMenus,
    updateMenu,
    deleteMenu
};
