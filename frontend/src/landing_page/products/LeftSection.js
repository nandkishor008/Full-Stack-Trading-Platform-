import React from 'react';

function LeftSection({imageURL,ProductName,ProductDescription,tryDemo,learnMore,googlePlay,appStore}) {
    return ( 
        <div className="container ">
            <div className='row '>
                <div className='col-6 p-5'>
                    <img src={imageURL}  />
                </div>
                <div className='col-6 p-5 mt-5'>
                    <h1>{ProductName}</h1>
                    <p>{ProductDescription}</p>
                    <div>
                        <a href={tryDemo}  style={{textDecoration:"none"}} >Try Demo <i class="fa-solid fa-arrow-right-long"></i></a>
                        
                        <a href={learnMore}  style={{textDecoration:"none", marginLeft:"100px"}}>Learn More <i class="fa-solid fa-arrow-right-long"></i></a>

                    </div>
                    <div className='mt-3'>
                        <a href={googlePlay}><img src="media\images\googlePlayBadge.svg"/></a>
                        <a href={appStore}  style={{ marginLeft:"50px"}}><img src="media\images\appstoreBadge.svg"/></a>
                        
                    </div>
                    
                    
                </div>
            </div>
        </div>
        
     );
}

export default LeftSection;