const db = require('../db');
const menuHelper = require('../helpers/menuHelper');
function insertMenu(menu) {
    return db.one('INSERT INTO menus (restaurant_id,name) VALUES (${restaurant_id},${name}) RETURNING *', menu);
}

function getMenusByRestaurant(restaurantId) {
    const query = `
        SELECT 
            menus.menu_id,
            menus.name AS menu_name,
            mi.item_id,
            mi.name as item_name,
            mi.description,
            mi.price
        FROM menus 
        JOIN menu_items mi on menus.menu_id = mi.menu_id 
        WHERE restaurant_id = $1
        ORDER BY menus.menu_id;
    `;
    return db.any(query, [restaurantId])
        .then(data =>{
            console.log(data)
            return menuHelper.formatMenus(data)
        })
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
