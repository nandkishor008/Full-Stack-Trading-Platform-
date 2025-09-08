import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = createContext(null);

// CRITICAL FIX: Use HTTPS instead of HTTP for all API calls
const API_BASE_URL = "https://zerodha-clone-env.eba-umbwwcgx.eu-north-1.elasticbeanstalk.com";

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/me`,  // FIXED: Use HTTPS base URL
          {
            withCredentials: true,
          }
        );
        setUser(res.data);
      } catch (err) {
        console.error("User not authenticated.", err);
        setLoading(false); // Stop loading if authentication fails
      }
    };
    fetchUser();
  }, []);

  const refreshData = async () => {
    if (!user) return;

    try {
      setLoading(true); // Set loading to true before fetching data
      const [h, p, o] = await Promise.all([
        axios.get(
          `${API_BASE_URL}/api/allHoldings`,  // FIXED: Use HTTPS base URL
          { withCredentials: true }
        ),
        axios.get(
          `${API_BASE_URL}/api/allPositions`,  // FIXED: Use HTTPS base URL
          { withCredentials: true }
        ),
        axios.get(
          `${API_BASE_URL}/api/orders`,  // FIXED: Use HTTPS base URL
          { withCredentials: true }
        ),
      ]);
      setHoldings(h.data);
      setPositions(p.data);
      setOrders(o.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  };

  useEffect(() => {
    if (user) {
      refreshData();
    }
  }, [user]);

  const removeHolding = async (holdingId) => {
    try {
      if (
        !window.confirm(
          "Are you sure you want to remove this holding? This action cannot be undone."
        )
      ) {
        return;
      }
      // Call the DELETE endpoint on your backend
      await axios.delete(
        `${API_BASE_URL}/api/holdings/${holdingId}`,  // FIXED: Use HTTPS base URL
        { withCredentials: true }
      );
      // Refresh all the data to update the UI
      await refreshData();
    } catch (error) {
      console.error("Error removing holding:", error);
      alert("Failed to remove the holding. Please try again.");
    }
  };

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };
  const handleCloseBuyWindow = () => setIsBuyWindowOpen(false);
  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
  };
  const handleCloseSellWindow = () => setIsSellWindowOpen(false);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        refreshData,
        user,
        holdings,
        positions,
        orders,
        loading,
        removeHolding,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;