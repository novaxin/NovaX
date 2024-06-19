import './App.css';
import React from 'react';
import Home from './pages/Home/Home';
import RandomPage from './pages/RandomPage/RandomPage';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile/Profile';
import Leaderboard from './pages/Leaderboard/Leaderboard';

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
                <Route path="/leaderboard" element={<Leaderboard />} />
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
