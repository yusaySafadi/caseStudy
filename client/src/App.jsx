import { useState } from 'react'
import './App.css'
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import RestaurantList from "./components/RestaurantList.jsx";
function App() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const handleSelectRestaurant = (restaurant) => {
        setSelectedRestaurant(restaurant)
    }
  return (
    <div className="app-container">
        <Header/>

        <div className="main-content">
            <Sidebar/>
            <RestaurantList onSelectRestaurant={handleSelectRestaurant} />
        </div>

    </div>
  )
}

export default App
