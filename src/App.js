import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import HomestayHost from './components/HomestayHost';
import Tourist from './components/Tourist';
import LocalGuide from './components/LocalGuide';
import Login from './components/Login';
import Signup from './components/Signup'; // Add Signup component
import { RecommendationProvider } from './context/RecommendationContext'; // Import the provider
import './App.css';

function App() {
  return (
    <RecommendationProvider> {/* Wrap the app with the provider */}
      <Router>
        <div id="root">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> {/* Add the signup route */}
            <Route path="/admin" element={<><Navbar /><Admin /></>} />
            <Route path="/host" element={<><Navbar /><HomestayHost /></>} />
            <Route path="/tourist" element={<><Navbar /><Tourist /></>} />
            <Route path="/guide" element={<><Navbar /><LocalGuide /></>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </RecommendationProvider>
  );
}

export default App;
