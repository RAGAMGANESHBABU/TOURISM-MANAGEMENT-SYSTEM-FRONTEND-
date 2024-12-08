import React, { createContext, useState, useContext } from 'react';

// Create context
const UserContext = createContext();

// Custom hook to use user context
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap your app with context
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(''); // Initially, no username set

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
