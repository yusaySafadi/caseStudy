import './Header.css'
import VWLogo from '../../assets/VWLogo.svg?react';
import {Link, useNavigate} from "react-router-dom";
function Header({user,setUser}) {
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('auth');
    };
    const navigate = useNavigate()
    return (
        <div className="header">
            <div className="header__logo-container" onClick={() =>navigate("/")}>
                <VWLogo/>
                <span>Flavour Fleet</span>
            </div>

            {user && user.role ==="admin" ? (
                <>
                    <h2 className={"header__title"}>Restaurant Admin Dashboard</h2>
                    <button onClick={handleLogout} className="header__button">Logout</button>
                </>

            ) : (
                <Link to="/login" className="header__button">Login</Link>
            )}
            {/*<input type="text" placeholder="Search" />*/}
        </div>
    );
}

export default Header;