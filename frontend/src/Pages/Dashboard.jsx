import React, { useState } from "react";
import BucketList from '../components/BucketList';
import Header from '../components/Header';
import PriceTracker from '../components/PriceTracker';
import ProductTracker from '../components/ProductTracker';
import './Dashboard.css';
// import video from '../Images/25696-352026473.mp4';
import video from '../Images/27770-365891067.mp4';



function Dashboard() {
  const [url, setUrl] = useState("");

  const handleSetUrl = (newUrl) => {
    setUrl(newUrl);
  };

  return (
    <>
    <Header/>
    <div className="main-body">
      <video autoPlay loop muted className="background-video">
        {/* <video autoPlay loop muted preload="auto" className="background-video"> */}
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="App" class= "dashboard-container">
      
        {/* <h1>Amazon Product Tracker</h1> */}
        <ProductTracker url={url} setUrl={handleSetUrl} />
        <br />
        <BucketList setUrl={handleSetUrl} /><br />
        {url && <PriceTracker url={url}/>}
      </div>
    </div>
    </>
  );
}

export default Dashboard;
