import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {useState} from 'react'
import './App.css'
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import RestaurantList from "./components/RestaurantList.jsx";
import RestaurantDetail from "./components/RestaurantDetail.jsx";
import Login from "./components/Login.jsx";

function App() {
    const [user, setUser] = useState(null);
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
        <Router>
            <div className="app-container">
                <Header user ={user} setUser={setUser}/>
                <div className={`main-content ${isDetailVisible ? 'details-visible' : ''}`}>
                    <Sidebar user={user}/>
                    <Routes>
                        <Route path="/login" element={<Login setUser={setUser} />} />
                        <Route path="/admin" element={user && user.role === 'admin' ? <h1>Hallo</h1>: <Navigate to="/login" />} />
                        <Route path="/" element={
                            <>
                                <RestaurantList onSelectRestaurant={handleSelectRestaurant}/>
                                {isDetailVisible && selectedRestaurant && (
                                <RestaurantDetail restaurant={selectedRestaurant} onClose={handleClose}/>)}
                            </> }/>
                    </Routes>

                </div>

            </div>
        </Router>
    )
}

export default App
