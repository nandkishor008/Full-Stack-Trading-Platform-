import React from 'react';

function Hero() {
    return ( 
       <section className="container-fluid" id="supportHero">
      <div className="p-5 " id="supportWrapper">
        <h4 >Support Portal</h4>
        <a href="" >Track Ticket</a>
      </div>
        <div className="row ">
            <div className=" col-6 p-5   ">
            <h1 className='fs-4 '>Search for an answer or browse help topics to create a ticket</h1>
            <input type="text"  placeholder="Eg: how do i activate F&O, why is my order getting rejected.. " />
            <br />

            <a href="" >Track account opening</a>
            <a href="">Track Segment activation</a>
            <a href="" >Intraday margins</a>
            <a href="" >Kite user manual</a>
        </div>
        <div className=" col-6 p-5 " >
            <h1 className='fs-4'>Featured</h1>
            <ol>
                <li><a href="" >Cureent Takeovers and Delisting-january 2025</a></li>
                <li><a href="" >Latest Intraday leverage-MIS & CO</a></li>
            </ol>
            
            
        </div>
        </div>
    </section>
     );
}

export default Hero;