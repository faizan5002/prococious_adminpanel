import React, { useState } from 'react';
import './Login.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make POST request to login API
    try {
      const response = await fetch('http://localhost:7000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data); // Log response from API

      // Handle successful login response
      alert('Login successful! Redirecting to dashboard.');
      navigate('/dashboard'); // Redirect to dashboard page after successful login

    } catch (error) {
      console.error('Login error:', error.message);
      setError('Invalid login credentials'); // Update error state for displaying error message
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Error modal or dialogue box */}
      {error && (
        <div className="error-modal">
          <p>{error}</p>
          <button onClick={() => setError('')}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Login;
