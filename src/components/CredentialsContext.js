import React, { createContext, useState } from 'react';

// Create the context
export const CredentialsContext = createContext();

// Create the provider to wrap the application and provide the credentials
export const CredentialsProvider = ({ children }) => {
  const [credentials, setCredentials] = useState({
    admin: { username: 'admin', password: 'admin123' },
    host: { username: 'host', password: 'host123' },
    tourist: { username: 'tourist', password: 'tourist123' },
    guide: { username: 'guide', password: 'guide123' },
  });

  const addUser = (newUsername, newPassword) => {
    setCredentials((prevCreds) => ({
      ...prevCreds,
      [newUsername]: { username: newUsername, password: newPassword },
    }));
  };

  return (
    <CredentialsContext.Provider value={{ credentials, addUser }}>
      {children}
    </CredentialsContext.Provider>
  );
};
