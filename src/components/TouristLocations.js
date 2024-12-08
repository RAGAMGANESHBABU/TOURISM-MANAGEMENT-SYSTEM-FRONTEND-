import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TouristLocations.css';

function TouristLocations() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State to track the search term

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/recommendations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchLocations();
  }, []);

  // Handle location card click to toggle details
  const handleLocationClick = (location) => {
    if (selectedLocation?.id === location.id) {
      setSelectedLocation(null);
    } else {
      setSelectedLocation(location);
    }
  };

  // Filter locations based on search term
  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="locations-container">
      <h2>Tourist Locations</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
        />
      </div>

      <div className="cards-container">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <div key={location.id} className="location-card">
              <div className="location-card-header">
                <button
                  onClick={() => handleLocationClick(location)}
                  className="location-name-button"
                >
                  {location.name}
                </button>
              </div>
              {selectedLocation?.id === location.id && (
                <div className="location-details">
                  <div className="image-section">
                    {location.imageUrl && (
                      <img
                        src={`http://localhost:8081${location.imageUrl}`}
                        alt={location.name}
                        className="location-image"
                      />
                    )}
                  </div>
                  <div className="description-section">
                    <h3>Description</h3>
                    <p>{location.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No tourist locations available.</p>
        )}
      </div>
    </div>
  );
}

export default TouristLocations;
