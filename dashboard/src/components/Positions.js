import React, { useContext } from 'react';
import GeneralContext from './GeneralContext';

const Positions = () => {
  const { positions, openBuyWindow, openSellWindow } = useContext(GeneralContext);
  
  if (!positions) {
      return <p>Loading positions...</p>;
  }


  const buyButtonStyle = {
    backgroundColor: '#4CAF50', 
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const sellButtonStyle = {
    backgroundColor: '#F44336', 
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const curValue=stock.price*stock.qty;
             
              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg ? stock.avg.toFixed(2) : '0.00'}</td>
                  <td>{stock.price ? stock.price.toFixed(2) : '0.00'}</td>
                  <td >{(curValue - stock.avg * stock.qty).toFixed(2)}</td>
                  
                  
                  <td>
                    {stock.qty > 0 && (
                      <button 
                        className="sell-action-btn" 
                        style={sellButtonStyle} 
                        onClick={() => openSellWindow(stock.name)}>
                        Sell
                      </button>
                    )}
                    {stock.qty < 0 && ( 
                      <button 
                        className="buy-action-btn" 
                        style={buyButtonStyle} 
                        onClick={() => openBuyWindow(stock.name)}>
                        Buy
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;