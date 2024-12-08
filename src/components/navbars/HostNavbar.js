import React from 'react';
import { Link } from 'react-router-dom';

function HostNavbar() {
  return (
    <nav>
      <ul>
      
        <li><Link to="/host">Home</Link></li>
        <li><Link to="/booking">Bookings</Link></li>
        {/* Add any host-specific links here */}
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default HostNavbar;
