import './NewRestaurantModal.css';
import CloseIcon from '../assets/close-Icon32.svg?react';
import {useEffect, useState} from "react";

const NewRestaurantModal = ({ isOpen, onClose, onSubmit }) => {
    const [restaurant, setRestaurant] = useState({
        name: '',
        description: '',
        street: '',
        house_number: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        additionalInfo: '',
        cuisines: [],
    });
    const [cuisines, setCuisines] = useState([]);
    useEffect(() => {
        if (isOpen) {
            fetch('http://localhost:3000/api/cuisines')
                .then(response => response.json())
                .then(data => setCuisines(data))
                .catch(error => console.error('Error fetching cuisines:', error));
        }
    }, [isOpen]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurant({ ...restaurant, [name]: value });
    };

    const handleCuisineChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setRestaurant({ ...restaurant, cuisines: selectedOptions });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(restaurant);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-button" onClick={onClose}> <CloseIcon/></button>
                <h2  className="modal-title">Add New Restaurant</h2>
                <form onSubmit={handleSubmit}  className="modal-form">
                    <label>
                        Name:
                        <input type="text" name="name" value={restaurant.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={restaurant.description} onChange={handleChange} required />
                    </label>
                    <label>
                        Street Address:
                        <input type="text" name="street" value={restaurant.street} onChange={handleChange} required />
                    </label>
                    <label>
                        House Number:
                        <input type="text" name="houseNumber" value={restaurant.houseNumber} onChange={handleChange} required />
                    </label>
                    <label>
                        City:
                        <input type="text" name="city" value={restaurant.city} onChange={handleChange} required />
                    </label>
                    <label>
                        State:
                        <input type="text" name="state" value={restaurant.state} onChange={handleChange} required />
                    </label>
                    <label>
                        Country:
                        <input type="text" name="country" value={restaurant.country} onChange={handleChange} required />
                    </label>
                    <label>
                        Postal Code:
                        <input type="text" name="postalCode" value={restaurant.postalCode} onChange={handleChange} required />
                    </label>
                    <label>
                        Additional Info:
                        <input type="text" name="additionalInfo" value={restaurant.additionalInfo} onChange={handleChange} />
                    </label>
                    <label>
                        Cuisines:
                        <select multiple name="cuisines" value={restaurant.cuisines} onChange={handleCuisineChange}>
                            {cuisines.map(cuisine => (
                                <option key={cuisine.cuisine_id} value={cuisine.cuisine_id}>{cuisine.name}</option>
                            ))}
                        </select> </label>
                    <button className="button" type="submit">Add Restaurant</button>
                </form>
            </div>
        </div>
    );
};

export default NewRestaurantModal;
