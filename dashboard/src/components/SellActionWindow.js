import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

// CRITICAL FIX: Use HTTPS instead of HTTP for all API calls
const API_BASE_URL =
  "http://zerodha-clone-env.eba-umbwwcgx.eu-north-1.elasticbeanstalk.com";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { closeSellWindow, refreshData, user } = useContext(GeneralContext);

  const handleSellClick = async () => {
    try {
      if (!user) {
        alert("Please login to place an order.");
        return;
      }

      await axios.post(
        `${API_BASE_URL}/api/newOrder`, // FIXED: Use HTTPS base URL
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "SELL",
        },
        { withCredentials: true }
      );

      await refreshData();
      closeSellWindow();
    } catch (error) {
      console.error("Error placing sell order:", error);
      alert("Error placing sell order. Please try again.");
    }
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <h2
          className="modal-title"
          style={{ textAlign: "center", color: "#F44336" }}
        >
          SELL {uid}
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
        <span>Amount ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <button
            className="btn btn-red"
            type="button"
            onClick={handleSellClick}
          >
            Sell
          </button>
          <button
            className="btn btn-grey"
            type="button"
            onClick={closeSellWindow}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
