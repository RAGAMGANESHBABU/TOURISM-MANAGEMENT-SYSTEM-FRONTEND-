import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Admin from './components/Admin';
import Tourist from './components/Tourist';
import LocalGuide from './components/LocalGuide';
import Login from './components/Login';
import Signup from './components/Signup';
import ManageListings from './components/ManageListings';
import BookingManager from './components/BookingManager';
import MyBookings from './components/MyBookings';
import TouristLocations from './components/TouristLocations';

import { RecommendationProvider } from './context/RecommendationContext'; // Wrap app for recommendations
import { UserProvider } from './context/UserContext'; // Add UserContext for shared state

// Navbar components for each role
import AdminNavbar from './components/navbars/AdminNavbar';
import HostNavbar from './components/navbars/HostNavbar';
import TouristNavbar from './components/navbars/TouristNavbar';
import GuideNavbar from './components/navbars/GuideNavbar';

import './App.css';

function App() {
  return (
    <UserProvider> {/* Provide user state to the entire app */}
      <RecommendationProvider> {/* Provide recommendation state */}
        <Router>
          <div id="root">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Admin routes */}
              <Route path="/admin" element={<><AdminNavbar /><Admin /></>} />
              <Route path="/ManageListings" element={<><AdminNavbar /><ManageListings /></>} />

              {/* Host routes */}
              <Route path="/host" element={<><HostNavbar /><ManageListings /></>} />
              <Route path="/booking" element={<><HostNavbar /><BookingManager /></>} />

              {/* Tourist routes */}
              <Route path="/tourist" element={<><TouristNavbar /><Tourist /></>} />
              <Route path="/places" element={<><TouristNavbar /><TouristLocations /></>} />
              <Route path="/mybooking" element={<><TouristNavbar /><MyBookings /></>} />

              {/* Guide routes */}
              <Route path="/guide" element={<><GuideNavbar /><LocalGuide /></>} />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </RecommendationProvider>
    </UserProvider>
  );
}

export default App;
