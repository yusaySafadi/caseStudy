import './RestaurantDetail.css'
import Map from "../Map/Map.jsx";
import CloseIcon from '../../assets/close-Icon32.svg?react';
import LocationIcon from '../../assets/location-Icon32.svg?react';
import Menu from "../Menu/Menu.jsx";
function RestaurantDetail({ restaurant, onClose }) {
    if (!restaurant) {
        return <div>Loading...</div>;
    }
    const location = {
        lat: parseFloat(restaurant.latitude),
        lng: parseFloat(restaurant.longitude)
    };
    const address = `${restaurant.street_address} ${restaurant.house_number}, ${restaurant.postal_code} ${restaurant.city}, ${restaurant.state}, ${restaurant.country}`;
    return (
        <div  className="restaurant-detail show">
            <div className="restaurant-detail__header">
                <button className={"close-button"} onClick={onClose}><CloseIcon/></button>
                <h2 className="restaurant-detail__title">{restaurant.restaurant_name}</h2>
                <div className="restaurant-detail__cuisines-container">
                    {restaurant.cuisines && restaurant.cuisines.length > 0 ? restaurant.cuisines.map((cuisine,index) => <span key={index}>{cuisine.name}</span>) : 'N/A'}
                </div>
            </div>
            <div className="restaurant-detail__body">
                <div className="restaurant-detail__address">
                    <LocationIcon className="restaurant-detail__address-icon"/>
                    <p className="restaurant-detail__address-text">{address}</p>
                </div>
                <Map apikey={import.meta.env.VITE_HERE_API_KEY} location={location}/>
                <p className="restaurant-detail__description">{restaurant.description}</p>
                <Menu restaurantId={restaurant.restaurant_id} />
            </div>

        </div>
    );
}

export default RestaurantDetail;
