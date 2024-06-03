function formatMenus(data) {
    const menus = {};

    data.forEach(row => {
        if (!menus[row.menu_id]) {
            menus[row.menu_id] = {
                menu_id: row.menu_id,
                name: row.menu_name,
                items: []
            };
        }
        menus[row.menu_id].items.push({
            itemId: row.item_id,
            name: row.name,
            description: row.description,
            price: parseFloat(row.price)
        });
    });

    return Object.values(menus);
}

module.exports = {
    formatMenus
};
