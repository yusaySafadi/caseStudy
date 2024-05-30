const menuItemModel = require('../models/menuItemModel');

async function addMenuItem(req, res) {
    const { menu_id, name, description, price } = req.body;
    try {
        const newItem = await menuItemModel.insertMenuItem({ menu_id, name, description, price });
        res.status(201).json({ message: 'Menu item added successfully', item: newItem });
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({ error: 'Failed to add menu item. Please try again later.' });
    }
}

async function getMenuItems(req, res) {
    const { menu_id } = req.params;
    try {
        const items = await menuItemModel.getMenuItemsByMenu(menu_id);
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Failed to fetch menu items. Please try again later.' });
    }
}

async function updateMenuItem(req, res) {
    const { item_id, menu_id, name, description, price } = req.body;
    try {
        const updatedItem = await menuItemModel.updateMenuItem({ item_id, menu_id, name, description, price });
        res.status(200).json({ message: 'Menu item updated successfully', item: updatedItem });
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ error: 'Failed to update menu item. Please try again later.' });
    }
}

async function deleteMenuItem(req, res) {
    const { item_id } = req.params;
    try {
        const deletedItem = await menuItemModel.deleteMenuItem(item_id);
        res.status(200).json({ message: 'Menu item deleted successfully', item: deletedItem });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ error: 'Failed to delete menu item. Please try again later.' });
    }
}

module.exports = {
    addMenuItem,
    getMenuItems,
    updateMenuItem,
    deleteMenuItem
};
