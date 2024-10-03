import React, { createContext, useState, useContext } from 'react';

// Create a Context for Recommendations
const RecommendationContext = createContext();

// Create a provider component
export const RecommendationProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState([]);

  const addRecommendation = (attraction) => {
    setRecommendations((prev) => [...prev, attraction]);
  };

  return (
    <RecommendationContext.Provider value={{ recommendations, addRecommendation }}>
      {children}
    </RecommendationContext.Provider>
  );
};

// Custom hook to use the Recommendation Context
export const useRecommendations = () => {
  return useContext(RecommendationContext);
};
