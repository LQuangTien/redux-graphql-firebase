import React from 'react';
import './style.scss';
import logo from './../../assets/logo192.png';
import { Link } from 'react-router-dom';
const Header = (props) => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="React logo" width="56" height="56" />
          </Link>
        </div>
        <div className="callToActions">
          <ul>
            <li>
              <Link to="/registration">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;
