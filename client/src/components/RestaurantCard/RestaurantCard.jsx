
import './RestaurantCard.css';
import categoryImages from "../../categoryImages";

function RestaurantCard({ restaurant, onSelect }) {
    const randomImageId = Math.floor(Math.random() * 1000); // Generate a random image ID
    const cuisineCategory = restaurant.cuisines[0]?.name.toLowerCase();
    const imageUrl = categoryImages[cuisineCategory] || '/public/default.jpg'; // Use a default image if category doesn't match

    return (
        <div className="restaurant-card" onClick={() => onSelect(restaurant)}>
            <div className="restaurant-card__image">
                {/* Placeholder for the restaurant image */}
                <img src={imageUrl} alt={restaurant.restaurant_name}/>
            </div>
            <div className="restaurant-card__info">
            <h3 className="restaurant-card__name">{restaurant.restaurant_name}</h3>
                <p className="restaurant-card__cuisine">{restaurant.cuisines.map(cuisine => cuisine.name).join(', ')}</p>
                <p className="restaurant-card__description">{restaurant.description}</p>
            </div>
        </div>
    );
}

export default RestaurantCard;
