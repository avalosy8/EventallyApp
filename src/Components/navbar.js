import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../Components/images/logo.png';
import signOut from '../helperFunctions';
import {GlobalContext} from '../Context/GlobalContext'

const Navbar = () => {
  const {user} = useContext(GlobalContext);

  return(
  <nav className="navbar">
    <div className="logo">
      <img src={logo} alt="WECE Logo" />
    </div>

    <div className="links">
      { user && <NavLink
        exact
        activeClassName="navbar__link--active"
        className="navbar__link"
        to="/home"
      >
        Home
      </NavLink>
      }

      {user && 
        <NavLink
        activeClassName="navbar__link--active"
        className="navbar__link"
        to="/events"
        >
          Events
        </NavLink>
      }

      {user && 
        <NavLink
        activeClassName="navbar__link--active"
        className="navbar__link"
        to="/points"
        >
          Points
        </NavLink>
      }

      {user && 
        <NavLink
        activeClassName="navbar__link--active"
        className="navbar__link"
        to="/"
        onClick={signOut}
        >
          Logout
        </NavLink>
      }
    </div>
  </nav>
)};

export default Navbar;