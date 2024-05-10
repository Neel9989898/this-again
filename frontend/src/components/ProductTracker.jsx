// frontend/src/components/ProductTracker.js
import axios from "axios";
import React, { useState } from "react";
import "./ProductTracker.css";
function ProductTracker({ url, setUrl }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // eslint-disable-next-line
  const [track, setTrack] = useState(null);
  // const [link,setLink] = useState('');
  const fetchData = async () => {
    setLoading(true);
    try {
      let destUrl = `http://localhost:5000/scrape?url=${encodeURIComponent(
        url
      )}`;
      console.log(destUrl);
      const response = await axios.get(destUrl);
      setData(response.data);
      console.log(response);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const trackData = async () => {
    setLoading(true);
    try {
      let trackUrl = `http://localhost:5000/scrape?url=${encodeURIComponent(
        url
      )}`;
      const response = await axios.get(trackUrl);
      setTrack(response.track);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="product-tracker-container">
      <h1>Product Tracker</h1>
      <div className="input-section" >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Product URL"
        />

        <button style={{margin:'10px'}} onClick={fetchData} disabled={loading}>
          Fetch Data
        </button>
        <button onClick={trackData} disabled={loading}>
          Track
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {data && (
        <div className="product-details">
          <div className="for-flex">
            <div className="image-gallery">
              <h3>Product Images:</h3>
              <div className="images">
                {data.image_urls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Product ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <h2>{data.description}</h2>
          </div>
          <div className="details-section">
            <p className="price">Price: {data.price}</p>
            <p className="customer-ratings">
              Number of Ratings: {data.customer_ratings}
            </p>
            <p className="number-of-reviews">
              Customer : {data.number_of_reviews}
            </p>
          </div>
          <div className="specifications">
            <h3>Specifications:</h3>
            <ul>
              {Object.entries(data.specifications).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductTracker;
