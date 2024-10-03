import React, { useState } from 'react';
import './LocalGuideDashboard.css'; // CSS file for styling the component

function LocalGuideDashboard() {
  const [attraction, setAttraction] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState('');

  const handleAddRecommendation = () => {
    if (attraction.trim() !== '') {
      setRecommendations([...recommendations, attraction]);
      setAttraction('');
      setMessage('Recommendation added successfully!');
    } else {
      setMessage('Please enter an attraction name.');
    }
  };

  return (
    <div className="local-guide-dashboard-container">
     

      <div className="recommendation-input">
        <input
          type="text"
          placeholder="Enter nearby attraction"
          value={attraction}
          onChange={(e) => setAttraction(e.target.value)}
        />
        <button onClick={handleAddRecommendation} className="add-button">Add Recommendation</button>
      </div>

      {message && <p className="message">{message}</p>}

      <h3>Recommendations List</h3>
      <ul className="recommendations-list">
        {recommendations.length > 0 ? (
          recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))
        ) : (
          <p>No recommendations added yet.</p>
        )}
      </ul>
    </div>
  );
}

export default LocalGuideDashboard;
