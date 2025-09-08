import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = createContext(null);

// DEMO: Use HTTP backend
const API_BASE_URL =
  "http://zerodha-clone-env.eba-umbwwcgx.eu-north-1.elasticbeanstalk.com";

export const GeneralContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const refreshData = async () => {
    if (!user) return;
    setLoading(true);
    const [h, p, o] = await Promise.all([
      axios.get(`${API_BASE_URL}/api/allHoldings`, { withCredentials: true }),
      axios.get(`${API_BASE_URL}/api/allPositions`, { withCredentials: true }),
      axios.get(`${API_BASE_URL}/api/orders`, { withCredentials: true }),
    ]);
    setHoldings(h.data);
    setPositions(p.data);
    setOrders(o.data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) refreshData();
  }, [user]);

  const removeHolding = async (id) => {
    if (!window.confirm("Remove this holding?")) return;
    await axios.delete(`${API_BASE_URL}/api/holdings/${id}`, {
      withCredentials: true,
    });
    refreshData();
  };

  const openBuy = (uid) => {
    setSelectedStockUID(uid);
    setIsBuyWindowOpen(true);
  };
  const closeBuy = () => setIsBuyWindowOpen(false);
  const openSell = (uid) => {
    setSelectedStockUID(uid);
    setIsSellWindowOpen(true);
  };
  const closeSell = () => setIsSellWindowOpen(false);

  return (
    <GeneralContext.Provider
      value={{
        user,
        loading,
        holdings,
        positions,
        orders,
        removeHolding,
        refreshData,
        openBuyWindow: openBuy,
        closeBuyWindow: closeBuy,
        openSellWindow: openSell,
        closeSellWindow: closeSell,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
