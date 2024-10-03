import React, { useState } from 'react';
import './ManageHomestays.css'; // CSS file for styling the component

function ManageHomestays() {
  // Sample state data (replace with API data for real scenarios)
  const [homestays, setHomestays] = useState([
    { id: 1, name: 'Cozy Hill Homestay', location: 'Hill Valley', price: 100, guests: ['John Doe'] },
    { id: 2, name: 'Sunny Beach Bungalow', location: 'Sunny Shores', price: 150, guests: [] },
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, homestayId: 1, guestName: 'John Doe', status: 'Confirmed' },
  ]);

  const [newHomestay, setNewHomestay] = useState({ name: '', location: '', price: '' });

  // Function to handle adding a new homestay
  const handleAddHomestay = (e) => {
    e.preventDefault();
    if (newHomestay.name && newHomestay.location && newHomestay.price) {
      setHomestays([...homestays, { ...newHomestay, id: homestays.length + 1, guests: [] }]);
      setNewHomestay({ name: '', location: '', price: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  // Function to handle deleting a homestay
  const handleDeleteHomestay = (id) => {
    setHomestays(homestays.filter((homestay) => homestay.id !== id));
    setBookings(bookings.filter((booking) => booking.homestayId !== id));
  };

  // Function to handle booking cancellation
  const handleCancelBooking = (id) => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: 'Cancelled' } : booking)));
  };

  return (
    <div className="manage-homestays-container">
      <h2>Manage Homestays</h2>

      {/* Form to add new homestay */}
      <form className="add-homestay-form" onSubmit={handleAddHomestay}>
        <input
          type="text"
          placeholder="Homestay Name"
          value={newHomestay.name}
          onChange={(e) => setNewHomestay({ ...newHomestay, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newHomestay.location}
          onChange={(e) => setNewHomestay({ ...newHomestay, location: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price per night"
          value={newHomestay.price}
          onChange={(e) => setNewHomestay({ ...newHomestay, price: e.target.value })}
          required
        />
        <button type="submit" className="add-homestay-button">Add Homestay</button>
      </form>

      {/* List of homestays */}
      <div className="homestays-list">
        {homestays.map((homestay) => (
          <div key={homestay.id} className="homestay-item">
            <h3>{homestay.name}</h3>
            <p>Location: {homestay.location}</p>
            <p>Price: ${homestay.price} per night</p>
            <button onClick={() => handleDeleteHomestay(homestay.id)} className="delete-homestay-button">Delete</button>
            {homestay.guests.length > 0 && (
              <div className="guests">
                <h4>Guests:</h4>
                {homestay.guests.map((guest, index) => (
                  <p key={index}>{guest}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <h2>Manage Bookings</h2>
      {/* List of bookings */}
      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-item">
            <p>Guest: {booking.guestName}</p>
            <p>Homestay: {homestays.find((h) => h.id === booking.homestayId)?.name}</p>
            <p>Status: {booking.status}</p>
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

export default ManageHomestays;
