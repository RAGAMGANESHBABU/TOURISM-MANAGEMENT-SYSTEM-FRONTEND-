import React, { useState, useEffect } from 'react';
import './MyBookings.css'; // Ensure the CSS file exists

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alert

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/bookings'); // API endpoint for bookings
        const data = await response.json();
        setBookings(data); // Assuming data contains booking and homestay details
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    try {
      // Send DELETE request to the backend
      const response = await fetch(`http://localhost:8081/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the booking from the frontend state
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));

        // Show success alert
        setAlertMessage('Booking successfully canceled!');
        setShowAlert(true);

        // Hide alert after 3 seconds
        setTimeout(() => setShowAlert(false), 2000);
      } else {
        console.error('Failed to delete booking:', response.statusText);

        // Show error alert
        setAlertMessage('Failed to cancel the booking. Please try again.');
        setShowAlert(true);

        // Hide alert after 3 seconds
        setTimeout(() => setShowAlert(false), 2000);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);

      // Show error alert
      setAlertMessage('An error occurred. Please try again.');
      setShowAlert(true);

      // Hide alert after 3 seconds
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="bookings-list">
      <h2>My Bookings</h2>

      {/* Alert Message */}
      {showAlert && <div className="alert-message">{alertMessage}</div>}

      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id} className="booking-item">
            <div className="homestay-info">
              {booking.homestay ? (
                <>
                  <p><strong>Homestay:</strong> {booking.homestay.title}</p>
                  <p><strong>Location:</strong> {booking.homestay.location}</p>
                  <p><strong>Price:</strong> ${booking.homestay.price} per night</p>
                </>
              ) : (
                <p>Homestay details unavailable.</p>
              )}
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
            <button
              onClick={() => handleCancelBooking(booking.id)}
              className="cancel-booking-button"
            >
              Cancel
            </button>
          </div>
        ))
      ) : (
        <p>No bookings yet.</p>
      )}
    </div>
  );
}

export default MyBookings;
