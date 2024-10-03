// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/host">Homestay Host</Link></li>
        <li><Link to="/tourist">Tourist</Link></li>
        <li><Link to="/guide">Local Guide</Link></li>
        <li><Link to="/login">Logout</Link></li> {/* Added Logout button */}
      </ul>
    </nav>
  );
}

export default Navbar;
