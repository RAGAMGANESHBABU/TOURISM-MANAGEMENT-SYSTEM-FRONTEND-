import React from 'react';
import { Link } from 'react-router-dom';

function TouristNavbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/tourist">Home</Link></li>
        <li><Link to="/places">Places</Link></li>
        <li><Link to="/mybooking">My Booking</Link></li>
        {/* Add any tourist-specific links here */}
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default TouristNavbar;
