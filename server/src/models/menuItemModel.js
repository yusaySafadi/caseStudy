const db = require("../db");

function insertMenuItem(item) {

    return db.one('INSERT INTO menu_items (menu_id, name, description, price) VALUES (${menu_id}, ${name}, ${description}, ${price}) RETURNING *', item);
}

function getMenuItemsByMenu(menuId) {
    return db.any('SELECT * FROM menu_items WHERE menu_id = $1', [menuId]);
}

function updateMenuItem(item){
    return db.oneOrNone('UPDATE menu_items SET name = ${name}, description = ${description}, price=${price} WHERE item_id = ${item_id}', item);
}

function deleteMenuItem(itemId){
    return db.result('DELETE FROM menu_items WHERE item_id = $1',itemId, r =>r.rowCount);
}

module.exports = {
    insertMenuItem,
    getMenuItemsByMenu,
    updateMenuItem,
    deleteMenuItem
}