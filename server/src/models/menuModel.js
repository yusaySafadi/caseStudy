const db = require('../db');

function insertMenu(menu) {
    return db.one('INSERT INTO menus (restaurant_id,name) VALUES (${restaurant_id},${name})', menu);
}

function getMenusByRestaurant(restaurantId) {
    return db.any('SELECT * FROM menus WHERE restaurant_id = $1', [restaurantId]);
}

function updateMenu(menu) {
    return db.oneOrNone('UPDATE menus SET name = ${name} WHERE menu_id = ${menu_id} RETURNING *', menu)
}

function deleteMenu(menuId) {
    return db.result('DELETE FROM menus WHERE menu_id = $1', menuId, r=>r.rowCount)
}

module.exports = {
    insertMenu,
    getMenusByRestaurant,
    updateMenu,
    deleteMenu

};
