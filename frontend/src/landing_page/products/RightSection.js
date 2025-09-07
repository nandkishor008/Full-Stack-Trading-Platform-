import React from 'react';


function RightSection({imageURL,ProductName,ProductDescription,learnMore}) {
    return ( 
        <div className="container ">
            <div className='row '>
                <div className='col-6  p-5' style={{textAlign: "left", display:"flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>
                    <h1 className=''>{ProductName}</h1>
                    <p>{ProductDescription}</p>
                    <a href={learnMore}  style={{textDecoration:"none"}}>Learn More <i class="fa-solid fa-arrow-right-long"></i></a>
                </div>

                <div className='col-6 p-5'>
                    <img src={imageURL}  />
                </div>
            </div>
        </div>
     );
}

export default RightSection;