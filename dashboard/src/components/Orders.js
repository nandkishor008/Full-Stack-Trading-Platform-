import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GeneralContext from './GeneralContext';

const Orders = () => {
  
  const { orders } = useContext(GeneralContext);

  if (!orders) {
    return <p>Loading orders...</p>;
  }

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">Get started</Link>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
               
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const modeClass = order.mode?.toUpperCase() === "BUY" ? "profit" : "loss";
                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{Number(order.price).toFixed(2)}</td>
                    <td className={modeClass}>{order.mode}</td>
                   
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;