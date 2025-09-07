import React from "react";
import { useNavigate } from "react-router-dom";

function Universe() {
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="container ">
      <div className="row ">
        <div className="text-center p-5">
          <h1 className="fs-2 mb-3">The Zerodha Universe</h1>
          <p>
            Extend your trading and investment experience even further with our
            partner platforms
          </p>
        </div>
        <div className="col-4  p-5 " style={{ textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
          <img src="media\images\smallcaseLogo.png" style={{width:"50%", marginLeft:"100px"}} />
          <p className="text-small text-muted mb-5 text-center mt-3">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>

          <img src="media\images\sensibullLogo.svg" style={{width:"50%", marginLeft:"100px", marginTop:"50px"}} />
          <p className="text-small text-muted text-center mt-3">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col-4 p-5 " style={{ textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>
          <img src="media\images\zerodhaFundhouse.png" style={{width:"50%",marginLeft:"100px"}} />
          <p className="text-small text-muted text-center mt-3">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
          <img src="media\images\streakLogo.png" style={{width:"50%",marginLeft:"100px",  marginTop:"50px"}} />
          <p className="text-small text-muted text-center mt-3">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="col-4 p-5 " style={{ textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
          <img src="media\images\tijori.svg" style={{width:"50%",marginLeft:"100px"}}/>
          <p className="text-small text-muted text-center mt-3">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
          <img src="media\images\dittoLogo.png" style={{width:"45%",marginLeft:"100px", marginTop:"50px"}} />
          <p className="text-small text-muted text-center mt-3">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>
         <button
          className="p-2 btn btn-primary fs-5 mb-5 mt-3"
          style={{ width: "20%", margin: "0 auto" }}
          onClick={handleSignupRedirect}
        >
          Sign up Now
        </button>
      </div>
    </div>
  );
}

export default Universe;