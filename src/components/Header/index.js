import React from 'react';
import './style.scss';
import logo from './../../assets/logo192.png';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/utils';
import { connect } from 'react-redux';
const Header = (props) => {
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="React logo" width="56" height="56" />
          </Link>
        </div>
        <div className="callToActions">
          {!currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">dashboard</Link>
              </li>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">dashboard</Link>
              </li>
              <li>
                <span onClick={() => auth.signOut()}>Logout</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = { currentUser: null };
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});
export default connect(mapStateToProps, null)(Header);
