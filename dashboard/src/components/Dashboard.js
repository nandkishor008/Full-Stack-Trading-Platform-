import React, { useEffect, useContext } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import GeneralContext, { GeneralContextProvider } from "./GeneralContext";

const API_BASE_URL =
  "http://zerodha-clone-env.eba-umbwwcgx.eu-north-1.elasticbeanstalk.com";

const Dashboard = () => {
  const { user, setUser } = useContext(GeneralContext);
  const navigate = useNavigate();

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
          if (error.response && error.response.status === 401) {
            navigate("/login");
          } else {
            alert("A network error occurred. Please try again later.");
          }
        }
      };
      fetchUser();
    }
  }, [user, setUser, navigate]);

  return (
    <GeneralContextProvider>
      <div className="dashboard-container">
        <WatchList />

        <div className="content">
          <Routes>
            <Route path="/summary" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="*" element={<Navigate to="/summary" />} />
          </Routes>
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;
