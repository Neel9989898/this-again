import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your CSS file for styling
import Logo from '../Images/Prize2.png';


const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
      <Link to='/'>  <img src={Logo} alt="Logo" className="logo" /></Link>
      </div>
    </header>
  );
}

export default Header;
