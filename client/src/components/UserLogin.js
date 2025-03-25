import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../api/api';
import '../styles/UserLogin.css';

const UserLogin = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(user.username, user.password);
      if (response.token) {
        localStorage.setItem('username', user.username);
        navigate('/homepage');
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-card">
        <h2 className="user-login-header">User Login</h2>
        {error && <p className="user-login-error">{error}</p>}
        <form className="user-login-form" onSubmit={handleSubmit}>
          <div className="user-login-form-group">
            <label htmlFor="username" className="user-login-label">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="user-login-input"
              placeholder="Enter your username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="user-login-form-group">
            <label htmlFor="password" className="user-login-label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="user-login-input"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="user-login-button">Login</button>
        </form>
        <p className="user-login-footer">
          Don't have an account?{' '}
          <button className="user-login-register-link" onClick={() => navigate('/signup')}>Register</button>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
