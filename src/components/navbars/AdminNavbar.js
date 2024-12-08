import React from 'react';
import { Link } from 'react-router-dom';

function AdminNavbar() {
  return (
    <nav>
      <ul>
      <li><Link to="/admin">Home</Link></li>
        <li><Link to="/ManageListings">Homestays</Link></li>
        {/* Add any admin-specific links here */}
        
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
