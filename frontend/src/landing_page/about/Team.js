import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row px-5 py-3 mt-5  border-top">
        <h1 className=" text-center ">People</h1>
      </div>

      <div
        className="row px-5 py-3  mb-5  text-muted"
        style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
      >
        <div className="col-6 p-5 text-center">
          <img
            src="media\images\nithinKamath.jpg"
            style={{ width: "60%", borderRadius: "100%" }}
          />
          <h2 className="mt-3">Nithin Kamath</h2>
          <p className="mb-5">Founder & CEO</p>
        </div>
        <div className="col-6 p-5">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>


          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>

          <p>
            Connect on &nbsp;
            <a href="" style={{ textDecoration: "none" }}>
              Homepage 
            </a>
            / <a href="" style={{ textDecoration: "none" }}>
               LinkedIn 
            </a>/ 
            <a href="" style={{ textDecoration: "none" }}>
              Twitter
            </a>
             
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
