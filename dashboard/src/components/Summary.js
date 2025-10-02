import React, { useContext, useMemo } from "react";
import GeneralContext from "./GeneralContext";
import axios from "axios";

// CRITICAL FIX: Use HTTPS instead of HTTP for all API calls
const API_BASE_URL = "https://full-stack-trading-platform.onrender.com";

// A helper function to format numbers into the k/L/Cr style
const formatIndianCurrency = (num) => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + "Cr";
  }
  if (num >= 100000) {
    return (num / 100000).toFixed(2) + "L";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + "k";
  }
  return num ? num.toFixed(2) : "0.00";
};

const Summary = () => {
  const { user, holdings, loading, refreshData } = useContext(GeneralContext);

  const holdingsSummary = useMemo(() => {
    if (!holdings || holdings.length === 0) {
      return {
        investment: 0,
        currentValue: 0,
        totalPandL: 0,
        pAndLPercentage: 0,
      };
    }
    const totalInvestment = holdings.reduce(
      (acc, holding) => acc + holding.avg * holding.qty,
      0
    );
    const currentValue = holdings.reduce(
      (acc, holding) => acc + holding.price * holding.qty,
      0
    );
    const totalPandL = currentValue - totalInvestment;
    const pAndLPercentage =
      totalInvestment === 0 ? 0 : (totalPandL / totalInvestment) * 100;

    return {
      investment: totalInvestment,
      currentValue,
      totalPandL,
      pAndLPercentage,
    };
  }, [holdings]);

  const handleSettleDay = async () => {
    if (
      !window.confirm(
        "Are you sure you want to settle the day? This will move all long positions to holdings and clear daily positions."
      )
    ) {
      return;
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/settle`, // FIXED: Use HTTPS base URL
        {},
        { withCredentials: true }
      );
      await refreshData();
      alert(res.data.message);
    } catch (error) {
      console.error("Failed to settle day:", error);
      alert("Failed to settle day. See console for details.");
    }
  };

  if (loading) {
    return <div>Loading summary...</div>;
  }

  if (!user) {
    return <div>Please log in to view your summary.</div>;
  }

  const isProfit = holdingsSummary.totalPandL >= 0;

  return (
    <>
      <div className="username">
        <h6>Hi{user && user.name ? `, ${user.name}` : ""}</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>
        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance <span>3.74k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>
        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {formatIndianCurrency(holdingsSummary.totalPandL)}
              <small>
                {isProfit ? "+" : ""}
                {holdingsSummary.pAndLPercentage.toFixed(2)}%
              </small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Current Value{" "}
              <span>{formatIndianCurrency(holdingsSummary.currentValue)}</span>
            </p>
            <p>
              Investment{" "}
              <span>{formatIndianCurrency(holdingsSummary.investment)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>End of Day</p>
        </span>
        <p style={{ fontSize: "14px", color: "#666", margin: "10px 0" }}>
          This will move all your open long positions to your holdings and clear
          your daily positions.
        </p>
        <button
          onClick={handleSettleDay}
          style={{
            backgroundColor: "#387ed1",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          End of Day Settlement
        </button>
      </div>
    </>
  );
};

export default Summary;
