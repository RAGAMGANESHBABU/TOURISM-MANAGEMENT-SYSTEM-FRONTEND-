import React, { useState } from 'react';
import './TouristDashboard.css'; // CSS file for styling the component

function TouristDashboard() {
  // Sample homestay data (replace with API data for real scenarios)
  const [homestays] = useState([
    { id: 1, name: 'Cozy Hill Homestay', location: 'Hill Valley', price: 100 },
    { id: 2, name: 'Sunny Beach Bungalow', location: 'Sunny Shores', price: 150 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('');

  // Function to handle search
  const handleSearch = () => {
    setSelectedHomestay(homestays.filter(homestay => homestay.name.toLowerCase().includes(searchQuery.toLowerCase())));
  };

  // Function to handle booking
  const handleBooking = (homestay) => {
    setSelectedHomestay(null);
    setBookingStatus(`You have successfully booked ${homestay.name} for $${homestay.price} per night.`);
  };

  return (
    <div className="tourist-dashboard-container">
      <h2>Tourist Dashboard</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for homestays..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {bookingStatus && <p className="booking-status">{bookingStatus}</p>}

      <div className="homestays-list">
        {selectedHomestay && selectedHomestay.length > 0 ? (
          selectedHomestay.map(homestay => (
            <div key={homestay.id} className="homestay-item">
              <h3>{homestay.name}</h3>
              <p>Location: {homestay.location}</p>
              <p>Price: ${homestay.price} per night</p>
              <button onClick={() => handleBooking(homestay)} className="book-button">Book Now</button>
            </div>
          ))
        ) : (
          <p>No homestays found. Please try another search.</p>
        )}
      </div>
    </div>
  );
}

export default TouristDashboard;
