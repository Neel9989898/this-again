// frontend/src/App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Homepage from './Pages/HomePage';

function App() {
  // const [url, setUrl] = useState("");

  // const handleSetUrl = (newUrl) => {
  //   setUrl(newUrl);
  // };

  return (
    // <div>
    //   <h1>Amazon Product Tracker</h1>
    //   <ProductTracker url={url} setUrl={handleSetUrl} />
    //   <BucketList setUrl={handleSetUrl} />
    //   {url && <PriceTracker url={url}/>}
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/dash" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
