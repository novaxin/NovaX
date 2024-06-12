import './App.css';
import React from 'react';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RandomPage from './pages/RandomPage/RandomPage';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col">
            <Navbar />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/random" element={<RandomPage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
