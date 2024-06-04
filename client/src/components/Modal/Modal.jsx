import React from 'react';
import './Modal.css';
import Menu from '../Menu/Menu.jsx';
import CloseIcon from '../../assets/close-Icon32.svg?react';
import LocationIcon from '../../assets/location-Icon32.svg?react';
import Map from "../Map/Map.jsx";

function Modal({ restaurant, onClose }) {
    if (!restaurant) {
        return null;
    }

    const location = {
        lat: parseFloat(restaurant.latitude),
        lng: parseFloat(restaurant.longitude)
    };

    const address = `${restaurant.street_address} ${restaurant.house_number}, ${restaurant.postal_code} ${restaurant.city}, ${restaurant.state}, ${restaurant.country}`;

    return (
        <div className="modal">
            <div className="modal__content">
                <button className="modal__close-button" onClick={onClose}>
                    <CloseIcon />
                </button>
                <h2 className="modal__title">{restaurant.restaurant_name}</h2>
                <div className="modal__cuisines">
                    {restaurant.cuisines.map((cuisine, index) => <span key={index}>{cuisine.name}</span>)}
                </div>
                <div className="modal__location">
                    <LocationIcon />
                    <p>{address}</p>

                </div>
                <Map apikey={"s-DEJldmvk1b5FY14g5x3uSqLvkmG7DXyN5uj7niJgU"} location={location}/>
                <p>{restaurant.description}</p>
                <Menu restaurantId={restaurant.restaurant_id} />
            </div>
        </div>
    );
}

export default Modal;
