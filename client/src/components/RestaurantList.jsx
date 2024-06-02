import './RestaurantList.css'
import {useEffect, useState} from "react";
function RestaurantList({onSelectRestaurant: onSelectRestaurant}){
   const [restaurants, setRestaurants] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/restaurants")
            .then(response => {
                if(!response.ok){
                    throw new Error("Response was not ok")
                }
                return response.json()
            }).then((data) => {
                setRestaurants(data);
                setLoading(false)
        }).catch((error) =>{
            setError(error);
            setLoading(false);
        })
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="restaurant-list">
            <h2 className="restaurant-list__title">Restaurants</h2>
            <table className={"restaurant-list__table"}>
                <thead className="restaurant-list__head">
                <tr className="restaurant-list__head__row">
                    <th>Name</th>
                    <th>Location</th>
                    <th>Cuisine</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody className="restaurant-list__table__body">
                {restaurants.map((restaurant,index) =>(
                    <tr key={index} onClick={()=> onSelectRestaurant(restaurant)}>
                        <td>{restaurant.restaurant_name}</td>
                        <td>{restaurant.street_address}</td>
                        <td>{restaurant.cuisines && restaurant.cuisines.length > 0 ?restaurant.cuisines.map(cuisine => cuisine.name).join(', ') : 'N/A'}</td>
                        <td>{restaurant.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default RestaurantList