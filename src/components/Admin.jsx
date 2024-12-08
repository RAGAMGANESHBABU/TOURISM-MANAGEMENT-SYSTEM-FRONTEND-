import React, { useState } from 'react';
import ManageUsers from './ManageUsers'; // Import the manage users component

function Admin() {
  const [credentials, setCredentials] = useState({
    admin: { username: 'admin', password: 'admin123', role: 'admin' },
    host: { username: 'host', password: 'host123', role: 'host' },
    tourist: { username: 'tourist', password: 'tourist123', role: 'tourist' },
    guide: { username: 'guide', password: 'guide123', role: 'guide' },
  });

  // Function to add a user using fetch
  const addUser = async (newUsername, newPassword, newRole) => {
    try {
      const response = await fetch('http://localhost:8081/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          role: newRole,
        }),
      });

      if (response.status === 201) {
        const newUser = await response.json(); // Assuming response contains the new user object

        // Update the local credentials state after adding the user
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          [newUsername]: newUser,
        }));

        alert('User added successfully!');
      } else {
        alert('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
    }
  };

  // Function to remove a user using fetch
  const removeUser = async (usernameToRemove) => {
    try {
      const response = await fetch(`http://localhost:8081/api/users/${usernameToRemove}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Remove user from credentials after successful deletion
        setCredentials((prevCredentials) => {
          const updatedCredentials = { ...prevCredentials };
          delete updatedCredentials[usernameToRemove]; // Remove user from state
          return updatedCredentials;
        });
        alert('User removed successfully!');
      } else {
        alert('Failed to remove user');
      }
    } catch (error) {
      console.error('Error removing user:', error);
      alert('Error removing user');
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Pass credentials, addUser, and removeUser as props */}
      <ManageUsers
        credentials={credentials}
        addUser={addUser}
        removeUser={removeUser}
      />
    </div>
  );
}

export default Admin;
