import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import GeneralContext from "../GeneralContext"; // Make sure this path is correct

const Menu = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { user } = useContext(GeneralContext);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://zerodha-clone-env.eba-umbwwcgx.eu-north-1.elasticbeanstalk.com/api/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "https://main.dphxll3jwggtr.amplifyapp.com/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const getNavLinkClass = ({ isActive }) => {
    const menuClass = "menu";
    const activeMenuClass = "menu selected";
    return isActive ? activeMenuClass : menuClass;
  };

  return (
    <div className="menu-container">
      <NavLink to="/summary" style={{ textDecoration: "none" }}>
        <img src="/logo.png" style={{ width: "50px" }} alt="Logo" />
      </NavLink>
      <div className="menus">
        <ul>
          <li>
            <NavLink
              to="/summary"
              className={getNavLinkClass}
              style={{ textDecoration: "none" }}
            >
              Summary
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={getNavLinkClass}
              style={{ textDecoration: "none" }}
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/holdings"
              className={getNavLinkClass}
              style={{ textDecoration: "none" }}
            >
              Holdings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/positions"
              className={getNavLinkClass}
              style={{ textDecoration: "none" }}
            >
              Positions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/funds"
              className={getNavLinkClass}
              style={{ textDecoration: "none" }}
            >
              Funds
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/apps"
              className={getNavLinkClass}
              style={{ textDecoration: "none" }}
            >
              Apps
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">
            {user ? user.name.slice(0, 2).toUpperCase() : "??"}
          </div>
          <p className="username">{user ? user.name : "USER"}</p>
        </div>
        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <button onClick={handleLogout} className="btn btn-danger w-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
