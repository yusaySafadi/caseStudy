import {BrowserRouter as Router, Link, Navigate, Route, Routes} from 'react-router-dom';
import {useEffect, useState} from 'react'
import './App.css'
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Header from "./components/Header/Header.jsx";
import RestaurantList from "./components/RestaurantList/RestaurantList.jsx";
import RestaurantDetail from "./components/RestaurantDetail/RestaurantDetail.jsx";
import Login from "./components/Login/Login.jsx";
import Modal from "./components/Modal/Modal.jsx";
import RestaurantCard from "./components/RestaurantCard/RestaurantCard.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";


function App() {
    const [user, setUser] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        // Fetch restaurants data
        fetch('http://localhost:3000/api/restaurants')
            .then(response => response.json())
            .then(data => setRestaurants(data));
    }, []);
    const handleSelectRestaurant = (restaurant) => {
        console.log(restaurant)
        setSelectedRestaurant(restaurant)
        setIsDetailVisible(true);
    }
    const handleClose = () => {
        setIsDetailVisible(false);
    };

    return (<Router>
        <div className="app-container">
            <Header user={user} setUser={setUser}/>
            <Routes>
                <Route path="/login" element={<Login setUser={setUser}/>}/>
                <Route path="/admin" element={<ProtectedRoute user={user && user.role === 'admin'} redirectTo="/login">
                    <div className={`main-content ${isDetailVisible ? 'details-visible' : ''}`}>
                        <Sidebar user={user}/>
                        <RestaurantList onSelectRestaurant={handleSelectRestaurant}/>
                        {isDetailVisible && selectedRestaurant && (
                            <RestaurantDetail restaurant={selectedRestaurant} onClose={handleClose}/>)}
                    </div>
                </ProtectedRoute>}/>
                <Route path="/" element={user ? (<Navigate to="/admin"/>) : (<div className="card-content">
                    {restaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.restaurant_id} restaurant={restaurant}
                                        onSelect={handleSelectRestaurant}/>))}
                    {isDetailVisible && selectedRestaurant && (
                        <Modal restaurant={selectedRestaurant} onClose={handleClose}/>)}

                </div>)}/>
            </Routes>
        </div>
    </Router>)
}

export default App
