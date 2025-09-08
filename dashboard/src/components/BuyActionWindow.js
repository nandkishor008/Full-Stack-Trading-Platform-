import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

// CRITICAL FIX: Use HTTPS instead of HTTP for all API calls
const API_BASE_URL = "https://zerodha-clone-env.eba-umbwwcgx.eu-north-1.elasticbeanstalk.com";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  
  // Get the user object from the context
  const { closeBuyWindow, refreshData, user } = useContext(GeneralContext);

  const handleBuyClick = async () => {
    try {
      // Check for the user from context
      if (!user) {
        alert("Please login to place an order.");
        return;
      }
      
      await axios.post(
        `${API_BASE_URL}/api/newOrder`,  // FIXED: Use HTTPS base URL
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
        },
        // Send the session cookie with the request
        { withCredentials: true }
      );
      
      await refreshData();
      closeBuyWindow();
    } catch (error) {
      console.error("Error placing buy order:", error);
      alert("Error placing buy order. Please try again.");
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h2 className="modal-title" style={{ textAlign: "center", color: "#4CAF50" }}>
          BUY {uid}
        </h2>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>
      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <button className="btn btn-blue" type="button" onClick={handleBuyClick}>
            Buy
          </button>
          <button className="btn btn-grey" type="button" onClick={closeBuyWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;