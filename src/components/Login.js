import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Ensure the path is correct

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Timer for auto-logout after 5 minutes
    const inactivityTimeout = setTimeout(() => {
      // Logout the user if they are inactive for 5 minutes
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      navigate('/login'); // Redirect to login page
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Event listeners to reset inactivity timer on user activity
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      setTimeout(() => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page
      }, 5 * 60 * 1000);
    };

    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keypress', resetInactivityTimer);

    // Clean up the event listeners on component unmount
    return () => {
      clearTimeout(inactivityTimeout);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keypress', resetInactivityTimer);
    };
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Directly check for the admin username and password
    if (username === 'admin' && password === 'gannu123*') {
      setSuccessMessage('Login successful as Admin');
      setTimeout(() => {
        navigate('/admin'); // Navigate to the admin dashboard
      }, 1500);
      return; // Exit function to prevent further execution
    }

    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const { role, token } = response.data;

        // Save user info in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);

        setSuccessMessage('Login successful');
        setTimeout(() => {
          // Redirect based on role
          if (role === 'admin') {
            navigate('/admin');
          } else if (role === 'tourist') {
            navigate('/tourist');
          } else if (role === 'guide') {
            navigate('/guide');
          } else if (role === 'host') {
            navigate('/host');
          }
        }, 1500);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred during login'
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
}

export default Login;
