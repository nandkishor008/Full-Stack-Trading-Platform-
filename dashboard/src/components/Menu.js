import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Menu.css';


const API_BASE_URL = "https://full-stack-trading-platform.onrender.com";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/me`, // FIXED: Use HTTPS base URL
          {
            withCredentials: true,
          }
        );
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
        `${API_BASE_URL}/api/logout`, // FIXED: Use HTTPS base URL
        {},
        { withCredentials: true }
      );
      window.location.href = "https://main.dphxll3jwggtr.amplifyapp.com/";
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
              style={{ textDecoration: "none" }}
            >
              Summary
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              onClick={() => handleMenuClick(1)}
              className={selectedMenu === 1 ? activeMenuClass : menuClass}
              style={{ textDecoration: "none" }}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/holdings"
              onClick={() => handleMenuClick(2)}
              className={selectedMenu === 2 ? activeMenuClass : menuClass}
              style={{ textDecoration: "none" }}
            >
              Holdings
            </Link>
          </li>
          <li>
            <Link
              to="/positions"
              onClick={() => handleMenuClick(3)}
              className={selectedMenu === 3 ? activeMenuClass : menuClass}
              style={{ textDecoration: "none" }}
            >
              Positions
            </Link>
          </li>
          <li>
            <Link
              to="/funds"
              onClick={() => handleMenuClick(4)}
              className={selectedMenu === 4 ? activeMenuClass : menuClass}
              style={{ textDecoration: "none" }}
            >
              Funds
            </Link>
          </li>
          <li>
            <Link
              to="/apps"
              onClick={() => handleMenuClick(5)}
              className={selectedMenu === 5 ? activeMenuClass : menuClass}
              style={{ textDecoration: "none" }}
            >
              Apps
            </Link>
          </li>
        </ul>
        <hr />
        <div
          className="profile"
          onClick={handleProfileClick}
          style={{
            cursor: "pointer",
            userSelect: "none",
            position: "absolute",
            right: "30px",
            top: "20px",
          }}
        >
          <div className="avatar">
            {user && user.name ? user.name.slice(0, 2).toUpperCase() : "??"}
          </div>
          <p className="username">{user && user.name ? user.name : "USER"}</p>
        </div>
        {isProfileDropdownOpen && (
          <div
            className="profile-dropdown"
            style={{
              position: "absolute",
              right: "30px",
              top: "60px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              borderRadius: "8px",
              padding: "14px",
              zIndex: 100,
            }}
          >
            <div
              style={{
                marginBottom: "8px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {user && user.name ? user.name : "USER"}
            </div>
            <div
              style={{ color: "#888", marginBottom: "12px", fontSize: "14px" }}
            >
              {user && user.email ? user.email : ""}
            </div>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#d9534f",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "8px 20px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
