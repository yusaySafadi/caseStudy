import React, {useState} from 'react';
import DashboardIcon from '../assets/dashboard-Icon.svg?react';
import ListIcon from '../assets/list-Icon.svg?react';
import PlusIcon from '../assets/plus-Icon.svg?react';
import NewRestaurantModal from "./NewRestaurantModal.jsx";

function Sidebar({user}) {
    const [active, setActive] = useState('Dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleSetActive = (page) => {
        setActive(page);
    };
    const handleAddRestaurant = async (newRestaurant) => {
        const username = 'admin';
        const password = 'secret';
        const auth = 'Basic ' + btoa(username + ':' + password);
        // Add the new restaurant to your data source (e.g., send a POST request to your backend)
        console.log('New Restaurant:', newRestaurant);
        try {
            const response = await fetch("http://localhost:3000/api/restaurants", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth
                },
                body: JSON.stringify(newRestaurant)
            });
            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        }
        handleCloseModal();
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
                    {user && user.role === 'admin' && (
                        <li className={active === 'NewRestaurant' ? 'active' : ''} onClick={() => {
                            handleSetActive('NewRestaurant');
                            handleOpenModal();
                        }}><PlusIcon className="icon"/>
                            <span>New Restaurant</span>
                        </li>)}


                </ul>
            </nav>
            <NewRestaurantModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddRestaurant}/>
        </div>
    )
}

export default Sidebar;