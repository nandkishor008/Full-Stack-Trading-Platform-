import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3002/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Not authenticated:", err);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3002/api/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "http://localhost:3000";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <Link to="/">
        <img src="/logo.png" style={{ width: "50px" }} alt="Logo" />
      </Link>
      <div className="menus">
        <ul>
          
          <li>
            <Link
              to="/Summary"
              onClick={() => handleMenuClick(0)}
              className={selectedMenu === 0 ? activeMenuClass : menuClass}
              style={{ textDecoration: 'none' }} 
            >
              Summary
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              onClick={() => handleMenuClick(1)}
              className={selectedMenu === 1 ? activeMenuClass : menuClass}
              style={{ textDecoration: 'none' }}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/holdings"
              onClick={() => handleMenuClick(2)}
              className={selectedMenu === 2 ? activeMenuClass : menuClass}
              style={{ textDecoration: 'none' }}
            >
              Holdings
            </Link>
          </li>
          <li>
            <Link
              to="/positions"
              onClick={() => handleMenuClick(3)}
              className={selectedMenu === 3 ? activeMenuClass : menuClass}
              style={{ textDecoration: 'none' }}
            >
              Positions
            </Link>
          </li>
          <li>
            <Link
              to="/funds"
              onClick={() => handleMenuClick(4)}
              className={selectedMenu === 4 ? activeMenuClass : menuClass}
              style={{ textDecoration: 'none' }}
            >
              Funds
            </Link>
          </li>
          <li>
            <Link
              to="/apps"
              onClick={() => handleMenuClick(5)}
              className={selectedMenu === 5 ? activeMenuClass : menuClass}
              style={{ textDecoration: 'none' }}
            >
              Apps
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar" >
            {user ? user.name.slice(0, 2).toUpperCase() : "??"}
          </div>
          <p className="username">{user ? user.name : "USER"}</p>
        </div>
        {isProfileDropdownOpen && (
          <div className="profile-dropdown" >
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