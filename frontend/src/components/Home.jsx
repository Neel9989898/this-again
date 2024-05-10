import React, { useState } from 'react';
import Logo from '../Images/Prize2.png';
import video from '../Images/video.mp4';
import './Home.css';
const Home = () => {
  const [zoomed, setZoomed] = useState(false);

  const handleButtonClick = () => {
    setZoomed(true);
    setTimeout(() => {
      window.location.href = "/dash";
    }, 500);  
  };
  
  return (
    <div className={`home-container ${zoomed ? 'zoomed' : ''}`}>
      <video autoPlay loop muted className="background-video">
      {/* <video autoPlay loop muted preload="auto" className="background-video"> */}
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <div className="left-content">
          <img src={Logo} alt="Logo" className="logo" />
          <p className="paragraph">Never miss a price drop again with PriceTrackr! Our easy-to-use 
          platform allows you to monitor prices of your favorite Amazon products and receive alerts 
          when they hit your desired price. Whether you're a savvy shopper, a deal hunter, or just 
          looking to save some extra cash, PriceTrackr is here to help you maximize your savings.</p>
        </div>
        <div className="right-content">
          <button className="button" onClick={handleButtonClick}>Let's Start</button>
        </div>
      </div>
      {/* <div><Copyright/></div> */}
    </div>
  );
};

export default Home;
