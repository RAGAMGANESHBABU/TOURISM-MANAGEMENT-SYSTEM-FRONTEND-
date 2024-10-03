import React from 'react';
import ManageListings from './ManageListings'; // Import the manage listings component

function Admin() {
  return (
    <div className="admin-dashboard">
      

      {/* Include the manage listings component */}
      <ManageListings />
    </div>
  );
}

export default Admin;
