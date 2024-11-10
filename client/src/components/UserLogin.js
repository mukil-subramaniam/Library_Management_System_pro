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
    <div className="login-page">
      <h2>User Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="input-label">Enter Your Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="input-label">Enter Your Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button className="register-button" onClick={() => navigate('/signup')}>Register</button></p>
    </div>
  );
};

export default UserLogin;
