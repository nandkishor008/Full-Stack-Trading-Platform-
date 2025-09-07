import React from 'react';

function Hero() {
    return ( 
        <div className="container border-bottom mb-5 mt-5">
          <div className="row p-5 text-center">
           <h1 >Technology</h1>
           <h3 className='text-muted mt-3 fs-4 '>Sleek, modern and intuitive trading platfroms</h3>
           <p className='mt-2 mb-5'>Check out our <a href=""  style={{textDecoration:"none"}}> investment offerings <i class="fa-solid fa-arrow-right-long"></i></a></p>
         </div>
        </div>
      );
}

export default Hero;