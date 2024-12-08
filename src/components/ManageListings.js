import React, { useState, useEffect, useCallback } from 'react';
import './ManageListings.css';

function ManageListings() {
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({ title: '', location: '', price: '', imageUrl: '' });
  const [image, setImage] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [editing, setEditing] = useState(false);  // To track if editing is in progress
  const [editListingId, setEditListingId] = useState(null);  // To track the listing being edited
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch listings from the backend
  const fetchListings = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8081/api/listings');
      const data = await response.json();
      setListings(data);
    } catch (error) {
      showAlert('error', 'Error fetching listings. Please try again.');
    }
  }, []); // UseCallback ensures the function doesn't change across renders
  
  useEffect(() => {
    fetchListings();
  }, [fetchListings]); // Now the useEffect dependency is safe

  // Show alert function
  const showAlert = (type, message) => {
    const id = Date.now();
    setAlerts((prevAlerts) => [
      ...prevAlerts,
      { id, type, message },
    ]);

    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
    }, 5000);
  };

  // Handle editing a listing
  const handleEditListing = (listing) => {
    setEditing(true);
    setEditListingId(listing.id);
    setNewListing({
      title: listing.title,
      location: listing.location,
      price: listing.price,
      imageUrl: listing.imageUrl,
    });
    setImage(null);  // Clear the image for re-upload if needed
  };

  // Handle adding or updating a listing
  const handleSaveListing = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newListing.title);
    formData.append('location', newListing.location);
    formData.append('price', newListing.price);
    if (image) {
      formData.append('image', image);
    }

    try {
      let response;
      if (editing) {
        // Update the listing
        response = await fetch(`http://localhost:8081/api/listings/${editListingId}`, {
          method: 'PUT',
          body: formData,
        });
        if (response.ok) {
          showAlert('success', 'Listing updated successfully!');
        } else {
          showAlert('error', 'Failed to update listing. Please try again.');
        }
      } else {
        // Add a new listing
        response = await fetch('http://localhost:8081/api/listings', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          showAlert('success', 'Listing added successfully!');
        } else {
          showAlert('error', 'Failed to add listing. Please try again.');
        }
      }
      // Reset the form after saving
      setEditing(false);
      setEditListingId(null);
      setNewListing({ title: '', location: '', price: '', imageUrl: '' });
      setImage(null);  // Clear image selection
      fetchListings();  // Refetch listings after adding/updating
    } catch (error) {
      showAlert('error', 'Error saving listing. Please try again.');
    }
  };

  // Handle deleting a listing
  const handleDeleteListing = async (id) => {
    try {
      // Log the request to ensure it's being triggered
      console.log("Deleting listing with ID:", id);
      
      const response = await fetch(`http://localhost:8081/api/listings/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Successfully deleted the listing
        setListings(listings.filter((listing) => listing.id !== id));
        showAlert('success', 'Listing deleted successfully!');
      } else {
        const errorMessage = await response.text();
        console.error('Failed to delete listing:', errorMessage);
        showAlert('error', 'Failed to delete listing. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      showAlert('error', 'Error deleting listing. Please try again.');
    }
  };
  

  // Filter listings based on search query
  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manage-listings-container">
      <h2>Manage Homestay Listings</h2>

      

      {/* Display Alerts */}
      <div className="alert-container">
        {alerts.map(alert => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            <span>{alert.message}</span>
            <button className="alert-close" onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))}>×</button>
          </div>
        ))}
      </div>

      {/* Form to add or update a listing */}
      <form className="add-listing-form" onSubmit={handleSaveListing}>
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
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" className="add-listing-button">
          {editing ? 'Update Listing' : 'Add Listing'}
        </button>
      </form>

      {/* List of existing listings (filtered) */}
      <div className="listings">
        <h2>Homestay List</h2>
        {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
        {filteredListings.map((listing) => (
          <div key={listing.id} className="listing-item">
            <div className="listing-info">
              <h3>{listing.title}</h3>
              <p>Location: {listing.location}</p>
              <p>Price: ${listing.price} per night</p>
              <button onClick={() => handleEditListing(listing)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDeleteListing(listing.id)} className="delete-button">
                Delete
              </button>
            </div>
            {listing.imageUrl && (
              <img
                src={`http://localhost:8081${listing.imageUrl}`}
                alt={listing.title}
                className="listing-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageListings;
