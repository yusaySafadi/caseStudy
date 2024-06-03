import { useState } from 'react'
import './App.css'
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import RestaurantList from "./components/RestaurantList.jsx";
import RestaurantDetail from "./components/RestaurantDetail.jsx";
function App() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [isDetailVisible, setIsDetailVisible] = useState(false);

    const handleSelectRestaurant = (restaurant) => {
        setSelectedRestaurant(restaurant)
        setIsDetailVisible(true);
    }
    const handleClose = () => {
        setIsDetailVisible(false);
    };

    return (
    <div className="app-container">
        <Header/>

        <div className={`main-content ${isDetailVisible ? 'details-visible' : ''}`}>
            <Sidebar/>
            <RestaurantList onSelectRestaurant={handleSelectRestaurant} />
            { isDetailVisible && selectedRestaurant && (<RestaurantDetail restaurant={selectedRestaurant} onClose={handleClose} />)}
        </div>

    </div>
  )
}

export default App
