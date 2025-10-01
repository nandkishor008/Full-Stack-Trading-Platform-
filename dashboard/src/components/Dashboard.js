import React, { useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import GeneralContext, { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const { user, setUser } = useContext(GeneralContext);

  // Add fallback to fetch user data if not available in context
  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/me`, {
            withCredentials: true,
          });
          setUser(res.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUser();
    }
  }, [user, setUser]);

  return (
    <GeneralContextProvider>
      <div className="dashboard-container">
        <WatchList />

        <div className="content">
          <Routes>
            <Route exact path="/" element={<Summary />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
          </Routes>
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;
