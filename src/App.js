import './App.css';
import React, { useContext } from 'react';
import Home from './pages/Home/Home';
import RandomPage from './pages/RandomPage/RandomPage';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext, AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <AuthProvider> {/* Ensure AuthProvider wraps the entire app */}
      <BrowserRouter>
        <div className="container">
          <div className="row">
            <div className="col">
              <Navbar />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/random" element={<RandomPage />} />
                {/* Use a component directly in Route element, not a function */}
                <Route path="/profile/:username" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
