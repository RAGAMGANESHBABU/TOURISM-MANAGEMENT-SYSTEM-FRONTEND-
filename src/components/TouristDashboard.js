import React, { useState, useEffect } from 'react';
import './TouristDashboard.css';

function TouristDashboard() {
  const [homestays, setHomestays] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHomestays, setFilteredHomestays] = useState([]);
  const [bookingStatus, setBookingStatus] = useState('');
  const [username, setUsername] = useState(''); // Track the logged-in user
  const [showAlert, setShowAlert] = useState(false); // To control the visibility of the custom alert
  const [alertMessage, setAlertMessage] = useState(''); // To hold the alert message

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/listings');
        const data = await response.json();
        setHomestays(data);
        setFilteredHomestays(data);
      } catch (error) {
        console.error('Error fetching homestays:', error);
      }
    };

    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.warn('User not logged in');
    }

    fetchHomestays();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const result = homestays.filter((homestay) =>
      homestay.title.toLowerCase().includes(query.toLowerCase()) ||
      homestay.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHomestays(result);
  };

  const handleBooking = async (homestay) => {
    if (!username) {
      setBookingStatus('Please log in to make a booking.');
      return;
    }

    console.log('Booking request for:', homestay.id);
    console.log('Booking details:', {
      homestayId: homestay.id,
      price: homestay.price,
      customerName: username,
    });

    try {
      const response = await fetch('http://localhost:8081/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          homestayId: homestay.id,
          price: homestay.price,
          customerName: username,
        }),
      });

      if (response.ok) {
        setAlertMessage(`Booking successful!`);
        setShowAlert(true);

        // Automatically hide the alert after 3 seconds
        setTimeout(() => setShowAlert(false), 2000);
      } else {
        setBookingStatus('Booking failed. Please try again.');
      }
    } catch (error) {
      setBookingStatus('Error occurred while booking. Please try again.');
      console.error('Error booking homestay:', error);
    }
  };

  return (
    <div className="tourist-dashboard-container">
      <h2>Tourist Dashboard</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for homestays..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {bookingStatus && <p className="booking-status">{bookingStatus}</p>}

      {/* Custom alert for success */}
      {showAlert && (
        <div className="alert success-alert">
          {alertMessage}
        </div>
      )}

      <div className="homestays-list">
        {filteredHomestays.length > 0 ? (
          filteredHomestays.map((homestay) => (
            <div key={homestay.id} className="homestay-item">
              <div className="homestay-info">
                <h3>Name: {homestay.title}</h3>
                <p>Location: {homestay.location}</p>
                <p>Price: ${homestay.price} per night</p>
                <button
                  onClick={() => handleBooking(homestay)}
                  className="book-button"
                >
                  Book Now
                </button>
              </div>
              {homestay.imageUrl && (
                <img
                  src={`http://localhost:8081${homestay.imageUrl}`}
                  alt={homestay.title}
                  className="homestay-image"
                />
              )}
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
