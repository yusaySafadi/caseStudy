import React, {useState} from 'react';
import DashboardIcon from '../assets/dashboard-Icon.svg?react';
import ListIcon from '../assets/list-Icon.svg?react';
import PlusIcon from '../assets/plus-Icon.svg?react';

function Sidebar() {
    const [active, setActive] = useState('Dashboard');

    const handleSetActive = (page) => {
        setActive(page);
    };
    return (
        <div className="sidebar">

            <nav>
                <ul>
                    <li className={active === 'Dashboard' ? 'active' : ''} onClick={() => handleSetActive('Dashboard')}>
                        <DashboardIcon  className="icon"/>
                        <span>Dashboard</span>
                    </li>
                    <li className={active === 'Restaurants' ? 'active' : ''} onClick={() => handleSetActive('Restaurants')}>
                        <ListIcon  className="icon"/>
                        <span>Restaurants list</span>
                    </li>

                    <li className={active === 'NewRestaurant' ? 'active' : ''} onClick={() => handleSetActive('NewRestaurant')}><PlusIcon  className="icon"/>
                        <span>New Restaurant</span>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;