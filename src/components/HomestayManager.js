import React, { useState } from 'react';
import './HomestayManager.css'; // Separate CSS for HomestayManager

function HomestayManager() {
  const [homestays, setHomestays] = useState([]); // Local state for homestays
  const [bookings, setBookings] = useState([]); // Local state for bookings
  const [newHomestay, setNewHomestay] = useState({ name: '', location: '', price: '' });

  // Function to handle adding a new homestay
  const handleAddHomestay = (e) => {
    e.preventDefault();
    if (newHomestay.name && newHomestay.location && newHomestay.price) {
      const newHomestayObj = {
        ...newHomestay,
        id: homestays.length + 1,
        price: parseFloat(newHomestay.price),
        guests: [],
      };
      setHomestays([...homestays, newHomestayObj]);
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

  return (
    <div className="homestay-manager-container">
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
        {homestays.length > 0 ? (
          homestays.map((homestay) => (
            <div key={homestay.id} className="homestay-item">
              <h3>{homestay.name}</h3>
              <p>Location: {homestay.location}</p>
              <p>Price: ${homestay.price.toFixed(2)} per night</p>
              <button onClick={() => handleDeleteHomestay(homestay.id)} className="delete-homestay-button">
                Delete
              </button>
              {homestay.guests && homestay.guests.length > 0 && (
                <div className="guests">
                  <h4>Guests:</h4>
                  {homestay.guests.map((guest, index) => (
                    <p key={index}>{guest}</p>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No homestays available</p>
        )}
      </div>
    </div>
  );
}

export default HomestayManager;
