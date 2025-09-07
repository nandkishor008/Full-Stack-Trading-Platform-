import React, { useContext, useMemo } from 'react';
import GeneralContext from './GeneralContext'; 
import { VerticalGraph } from "./VerticalGraph";


const formatForStyle = (num) => {
  const number = num || 0;
  const parts = number.toFixed(2).split('.');
  return (
    <>
      {Number(parts[0]).toLocaleString('en-IN')}
      <span>.{parts[1]}</span>
    </>
  );
};

const Holdings = () => {
  // Get the holdings array AND the new removeHolding function
  const { holdings, removeHolding } = useContext(GeneralContext);

  const portfolioSummary = useMemo(() => {
    if (!holdings || holdings.length === 0) {
      return { investment: 0, currentValue: 0, totalPandL: 0, pAndLPercentage: 0 };
    }
    const totalInvestment = holdings.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
    const currentValue = holdings.reduce((acc, stock) => acc + (stock.price * stock.qty), 0);
    const totalPandL = currentValue - totalInvestment;
    const pAndLPercentage = totalInvestment === 0 ? 0 : (totalPandL / totalInvestment) * 100;
    return { investment: totalInvestment, currentValue, totalPandL, pAndLPercentage };
  }, [holdings]);

  if (!holdings) {
    return <p>Loading holdings...</p>;
  }
  
  const labels = holdings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: holdings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
              <th>Action</th> 
            </tr>
          </thead>
          <tbody>
            {holdings.map((stock) => { 
              const curValue = stock.price * stock.qty;
              const pAndL = curValue - (stock.avg * stock.qty);
              const isProfit = pAndL >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";
              return (
                <tr key={stock._id}> 
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{pAndL.toFixed(2)}</td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                  
                 
                  <td>
                    <button 
                      className="remove-btn" 
                      onClick={() => removeHolding(stock._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      
      <div className="row">
        <div className="col">
          <h5>
            {formatForStyle(portfolioSummary.investment)}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {formatForStyle(portfolioSummary.currentValue)}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={portfolioSummary.totalPandL >= 0 ? 'profit' : 'loss'}>
            {portfolioSummary.totalPandL.toLocaleString('en-IN', { maximumFractionDigits: 2 })} 
            ( {portfolioSummary.totalPandL >= 0 ? '+' : ''}
            {portfolioSummary.pAndLPercentage.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      
      <VerticalGraph data={data}/>
    </>
  );
};

export default Holdings;