import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import './BookingManager.css'; // Separate CSS for BookingManager

function BookingManager({ homestays = [] }) { // Accept homestays as a prop
  // State to manage bookings
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from the backend API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/bookings'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data); // Store the fetched bookings data in the state
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to handle booking cancellation
  const handleCancelBooking = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/bookings/${id}/cancel`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }
      
      // Update the local state to reflect the booking cancellation
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: 'Cancelled' } : booking
        )
      );
    } catch (error) {
      console.error('Error canceling booking:', error.message);
    }
  };

  // Function to handle status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8081/api/bookings/${id}/status`, {
        method: 'PATCH', // Use PATCH for partial update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }), // Send the new status
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      const updatedBooking = await response.json(); // Assuming backend returns the updated booking

      // Update the local state to reflect the status change
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...updatedBooking } : booking
        )
      );
    } catch (error) {
      console.error('Error updating booking status:', error.message);
    }
  };

  return (
    <div>
      <center><h2>Manage Bookings</h2></center>
      {/* List of bookings */}
      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-item">
            <p>Customer: satya</p>
            <p>Homestay: {homestays.find((h) => h.id === booking.homestay_id)?.title || 'Krishna'}</p>
            <p>Status: 
              {/* Dropdown to update status */}
              <select
                value={booking.status}
                onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                className="status-dropdown"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </p>
            {booking.status === 'Confirmed' && (
              <button onClick={() => handleCancelBooking(booking.id)} className="cancel-booking-button">
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingManager;
