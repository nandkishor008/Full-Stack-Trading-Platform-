import React from 'react';

function Hero() {
    return (
       <div className="container">
      <div className="row p-5 mt-5 mb-5 text-center  border-bottom">
        <h1 className="fs-3 text-center mb-3 ">Pricing</h1>
        <p className='text-muted fs-5'>Free equity investments and flat <i class="fa-solid fa-indian-rupee-sign"></i>20 and F&O trades</p>
      </div>

      <div className="row p-5 mt-5 mb-5  text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
        <div className="col-4 p-5">
          <img src="media\images\pricing0.svg"/>
          <h1  className='fs-3 text-center mb-2'>Free equity delivery</h1>
          <p className='fs-6 text-center text-muted'>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
          
        </div>
        <div className="col-4 p-5">
          <img src="media\images\intradayTrades.svg"/>
          <h1 className='fs-3 text-center mb-2 '>Intraday and F&O trades</h1>
          <p className='fs-6 text-center text-muted'>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
          
        </div>
        <div className="col-4 p-5">
           <img src="media\images\pricing0.svg"/>
           <h1  className='fs-3 text-center mb-2'>Free direct MF</h1>
           <p className='fs-6 text-center text-muted'>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
          
        </div>
      </div>
    </div>
        
      );
}

export default Hero;