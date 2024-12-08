import React, { useState, useEffect } from 'react';
import './ManageUsers.css'; // Import the CSS file for styles

function ManageUsers() {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]); // New state to store users fetched from the backend
  const [alerts, setAlerts] = useState([]); // State to store alerts

  const allowedRoles = ['admin', 'host', 'guide', 'tourist']; // Allowed roles

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/auth/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          showAlert('error', 'Failed to fetch users');
        }
      } catch (error) {
        showAlert('error', 'Error fetching users. Please check your network or try again.');
      }
    };
    fetchUsers();
  }, []);

  const showAlert = (type, message) => {
    const id = Date.now();
    setAlerts((prevAlerts) => [
      ...prevAlerts,
      { id, type, message },
    ]);

    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
    }, 5000);
  };

  const handleAddUser = async () => {
    if (!newUsername || !newPassword || !newRole) {
      showAlert('error', 'Please fill in all fields (username, password, and role).');
      return;
    }

    if (!allowedRoles.includes(newRole.toLowerCase())) {
      showAlert('error', 'Invalid role. Allowed roles are: admin, host, guide, or tourist.');
      return;
    }

    const newUser = {
      username: newUsername,
      password: newPassword,
      role: newRole.toLowerCase(),
    };

    try {
      const response = await fetch('http://localhost:8081/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        showAlert('success', 'User added successfully');
        setNewUsername('');
        setNewPassword('');
        setNewRole('');
        const updatedUsersResponse = await fetch('http://localhost:8081/api/auth/users');
        const updatedUsers = await updatedUsersResponse.json();
        setUsers(updatedUsers);
      } else {
        showAlert('error', 'Failed to add user');
      }
    } catch (error) {
      showAlert('error', 'Error adding user. Please check your network or try again.');
    }
  };

  const handleRemoveUser = async (username) => {
    if (!username) {
      showAlert('error', 'Username is required for removal.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/api/auth/users/${username}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
        showAlert('success', 'User removed successfully!');
      } else {
        showAlert('error', 'Failed to remove user. Please try again.');
      }
    } catch (error) {
      showAlert('error', 'Error removing user. Please try again.');
    }
  };

  const handleUpdateRole = async (username, newRole) => {
    if (!allowedRoles.includes(newRole)) {
      showAlert('error', 'Invalid role selected');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/api/auth/users/${username}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        const updatedUsersResponse = await fetch('http://localhost:8081/api/auth/users');
        const updatedUsers = await updatedUsersResponse.json();
        setUsers(updatedUsers);
        showAlert('success', 'User role updated successfully!');
      } else {
        showAlert('error', 'Failed to update user role');
      }
    } catch (error) {
      showAlert('error', 'Error updating role. Please try again.');
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="heading">Manage Users</h2>

      {/* Display Alerts */}
      <div className="alert-container">
        {alerts.map(alert => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            <span>{alert.message}</span>
            <button className="alert-close" onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))}>×</button>
          </div>
        ))}
      </div>

      <div className="formContainer">
        <input
          type="text"
          value={newUsername}
          placeholder="New Username"
          onChange={(e) => setNewUsername(e.target.value)}
          className="input"
        />
        <input
          type="password"
          value={newPassword}
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          className="input"
        />
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="input"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="host">Host</option>
          <option value="guide">Guide</option>
          <option value="tourist">Tourist</option>
        </select>
        <button onClick={handleAddUser} className="addButton">
          Add User
        </button>
      </div>

      <div className="userList">
        <h3 className="subHeading">User List</h3>
        <input
          type="text"
          value={searchQuery}
          placeholder="Search Users"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchInput"
        />
        <div className="userListContainer">
          {filteredUsers.length === 0 ? (
            <p>No users found.</p>
          ) : (
            filteredUsers.map((user) => (
              <div className="userItem" key={user.username}>
                <span className="userInfo">
                  Username: {user.username} | Role:
                  <select
                    value={user.role}
                    onChange={(e) => handleUpdateRole(user.username, e.target.value)}
                    className="roleSelect"
                  >
                    <option value="admin">Admin</option>
                    <option value="host">Host</option>
                    <option value="guide">Guide</option>
                    <option value="tourist">Tourist</option>
                  </select>
                </span>
                <button
                  onClick={() => handleRemoveUser(user.username)}
                  className="removeButton"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
