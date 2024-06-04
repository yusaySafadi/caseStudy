import React, { useEffect, useState } from 'react';
import './Menu.css';

const Menu = ({ restaurantId }) => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        fetch(`${apiUrl}/api/menus/${restaurantId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMenu(data);
                console.log(menu);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching menu:', error);
                setLoading(false);
            });
    }, [restaurantId]);

    if (loading) {
        return <div>Loading menu...</div>;
    }

    return (
        <div className="menu">
            {menu.length > 0 ? (menu.map((menuCategory, menuIndex) => (
                <div key={menu.menu_id} className="menu__section">
                    <h3 className="menu__section-title">{menuCategory.name}</h3>
                    {menuCategory.items.map((item, itemIndex) => (
                        <div key={item.item_id} className="menu__item">
                            <div className="menu__item-details">
                                <h4 className="menu__item-name">{item.name}</h4>
                                <p className="menu__item-description">{item.description}</p>
                            </div>
                            <div className="menu__item-price">${item.price.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            ))) :(<h3>No menus available for this restaurant</h3>)}
        </div>
    );
};

export default Menu;
