import React from 'react';
import './style.scss';
import logo from './../../assets/logo192.png';
const Header = (props) => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <img src={logo} alt="React logo" width="56" height="56" />
        </div>
      </div>
    </header>
  );
};
export default Header;
