import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const credentials = {
    admin: { username: 'admin', password: 'admin123' },
    host: { username: 'host', password: 'host123' },
    tourist: { username: 'tourist', password: 'tourist123' },
    guide: { username: 'guide', password: 'guide123' },
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === credentials.admin.username && password === credentials.admin.password) {
      navigate('/admin');
    } else if (username === credentials.host.username && password === credentials.host.password) {
      navigate('/host');
    } else if (username === credentials.tourist.username && password === credentials.tourist.password) {
      navigate('/tourist');
    } else if (username === credentials.guide.username && password === credentials.guide.password) {
      navigate('/guide');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link> {/* Using Link here */}
        </p>
      </form>
    </div>
  );
}

export default Login;
