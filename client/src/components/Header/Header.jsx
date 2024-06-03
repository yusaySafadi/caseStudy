import './Header.css'
import VWLogo from '../../assets/VWLogo.svg?react';
function Header() {
    return (
        <div className="header">
            <div className="header__logo-container">
                <VWLogo/>
                <span>Flavour Fleet</span>
            </div>
            <h2 className={"header__title"}>Restaurant Admin Dashboard</h2>
            {/*<input type="text" placeholder="Search" />*/}
        </div>
    );
}

export default Header;