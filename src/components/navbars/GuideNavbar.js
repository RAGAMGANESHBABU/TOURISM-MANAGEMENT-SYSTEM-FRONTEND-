import React from 'react';
import { Link } from 'react-router-dom';

function GuideNavbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/guide">Home</Link></li>
        {/* Add any guide-specific links here */}
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default GuideNavbar;
