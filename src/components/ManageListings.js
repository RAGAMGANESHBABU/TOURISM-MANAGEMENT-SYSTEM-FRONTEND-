import React, { useState } from 'react';
import './ManageListings.css'; // Add styles specific to the manage listings component

function ManageListings() {
  // Sample state for managing listings (replace with API data in a real-world scenario)
  const [listings, setListings] = useState([
    { id: 1, title: 'Cozy Homestay in the Hills', location: 'Hill Valley', price: 120 },
    { id: 2, title: 'Beachside Bungalow', location: 'Sunny Shores', price: 200 },
  ]);

  const [newListing, setNewListing] = useState({ title: '', location: '', price: '' });

  // Handle adding a new listing
  const handleAddListing = (e) => {
    e.preventDefault();
    if (newListing.title && newListing.location && newListing.price) {
      setListings([...listings, { ...newListing, id: listings.length + 1 }]);
      setNewListing({ title: '', location: '', price: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  // Handle deleting a listing
  const handleDeleteListing = (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  return (
    <div className="manage-listings-container">
      <h2>Manage Homestay Listings</h2>

      {/* Form to add a new listing */}
      <form className="add-listing-form" onSubmit={handleAddListing}>
        <input
          type="text"
          placeholder="Title"
          value={newListing.title}
          onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newListing.location}
          onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price per night"
          value={newListing.price}
          onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
          required
        />
        <button type="submit" className="add-listing-button">
          Add Listing
        </button>
      </form>

      {/* List of existing listings */}
      <div className="listings">
        {listings.map((listing) => (
          <div key={listing.id} className="listing-item">
            <h3>{listing.title}</h3>
            <p>Location: {listing.location}</p>
            <p>Price: ${listing.price} per night</p>
            <button onClick={() => handleDeleteListing(listing.id)} className="delete-button">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageListings;
