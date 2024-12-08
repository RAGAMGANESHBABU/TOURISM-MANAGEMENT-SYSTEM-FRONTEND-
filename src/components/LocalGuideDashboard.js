import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LocalGuideDashboard.css';

function LocalGuideDashboard() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/recommendations');
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setMessage('Error fetching recommendations.');
      }
    };

    fetchRecommendations();
  }, []);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddOrUpdateRecommendation = async () => {
    if (name.trim() === '' || description.trim() === '') {
      setMessage('Please fill all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (editingId) {
        // Update existing recommendation
        const response = await axios.put(`http://localhost:8081/api/recommendations/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setRecommendations(
          recommendations.map((rec) =>
            rec.id === editingId ? { ...rec, ...response.data } : rec
          )
        );
        setMessage('Recommendation updated successfully!');
      } else {
        // Add new recommendation
        const response = await axios.post('http://localhost:8081/api/recommendations', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setRecommendations([...recommendations, response.data]);
        setMessage('Recommendation added successfully!');
      }
      resetForm();
    } catch (error) {
      console.error('Error details:', error);
      setMessage('Error saving recommendation.');
    }
  };

  const handleDeleteRecommendation = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/recommendations/${id}`);
      setRecommendations(recommendations.filter((rec) => rec.id !== id));
      setMessage('Recommendation deleted successfully!');
    } catch (error) {
      console.error('Error deleting recommendation:', error);
      setMessage('Error deleting recommendation.');
    }
  };

  const handleEditRecommendation = (rec) => {
    setName(rec.name);
    setDescription(rec.description);
    setImage(null); // Reset image to avoid overwriting if no new image is uploaded
    setEditingId(rec.id);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setImage(null);
    setEditingId(null);
  };

  return (
    <div className="local-guide-dashboard-container">
      <h2>Local Guide Dashboard</h2>

      <div className="recommendation-input">
        <input
          type="text"
          placeholder="Enter attraction name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Enter attraction description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <p className="image-name">{image.name}</p>}
        <button onClick={handleAddOrUpdateRecommendation} className="add-button">
          {editingId ? 'Update Places' : 'Add Places'}
        </button>
        {editingId && <button onClick={resetForm} className="cancel-button">Cancel</button>}
      </div>

      {message && <p className="message">{message}</p>}

      <h3>Places List</h3>
      <ul className="recommendations-list">
        {recommendations.length > 0 ? (
          recommendations.map((rec) => (
            <li key={rec.id} className="recommendation-item">
              <div className="recommendation-details">
                <div className="text-section">
                  <h3>Name : {rec.name}</h3>
                  <br></br>
                  <h3>Description : {rec.description}</h3>
                  <div className="button-group">
                    <button onClick={() => handleEditRecommendation(rec)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteRecommendation(rec.id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </div>
                {rec.imageUrl && (
                  <div className="image-section">
                    <img
                      src={`http://localhost:8081${rec.imageUrl}`}
                      alt={`Attraction ${rec.id}`}
                      className="recommendation-image"
                    />
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>No places added yet.</p>
        )}
      </ul>
    </div>
  );
}

export default LocalGuideDashboard;
