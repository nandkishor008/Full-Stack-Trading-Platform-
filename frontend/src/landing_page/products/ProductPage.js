import React from "react";
import Hero from "./Hero";
import Universe from "./Universe";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

function ProductPage() {
  return (
    <>
      <Hero />
      <LeftSection
        imageURL="media\images\kite.png"
        ProductName="Kite"
        ProductDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection 
        imageURL="media\images\console.png"
        ProductName="Console"
        ProductDescription="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
        learnMore=""
        />

      <LeftSection
        imageURL="media\images\coin.png"
        ProductName="Coin"
        ProductDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
       <RightSection 
        imageURL="media\images\kiteconnect.png"
        ProductName="Kite Connect API"
        ProductDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
        learnMore=""
        />

      <LeftSection
        imageURL="media\images\varsity.png"
        ProductName="Varsity mobile"
        ProductDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />

      <p className="text-center fs-5  p-5">Want to know more about our technology stack? Check out the  <a href=""  style={{textDecoration:"none"}}>Zerodha.tech </a> blog.</p>
      <Universe />
    </>
  );
}

export default ProductPage;
