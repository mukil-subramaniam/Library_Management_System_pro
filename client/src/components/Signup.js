import React, { useState } from 'react';
import { userSignup } from '../api/api'; // Import the signup API function
import '../styles/Signup.css'; // Import your CSS styles

const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  const [error, setError] = useState(''); // State to handle errors
  const [success, setSuccess] = useState(''); // State to handle success messages

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userSignup(
        user.username,
        user.email,
        user.name,
        user.password,
        user.phone
      );
      // If signup is successful, handle the success (e.g., redirect, show success message)
      console.log('User signed up successfully:', response);
      setSuccess('Signup successful! You can now log in.');
      setError(''); // Clear any previous errors
    } catch (err) {
      // Handle signup error
      console.error('Signup error:', err);
      setError('Signup failed. Please try again.');
      setSuccess(''); // Clear any success message
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-header">User Signup</h2>
      {error && <p className="signup-error-message">{error}</p>}
      {success && <p className="signup-success-message">{success}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form-group">
          <label className="signup-label">Username</label>
          <input
            type="text"
            name="username"
            className="signup-input"
            placeholder="Enter Username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="signup-form-group">
          <label className="signup-label">Email</label>
          <input
            type="email"
            name="email"
            className="signup-input"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="signup-form-group">
          <label className="signup-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="signup-input"
            placeholder="Enter Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="signup-form-group">
          <label className="signup-label">Password</label>
          <input
            type="password"
            name="password"
            className="signup-input"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="signup-form-group">
          <label className="signup-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="signup-input"
            placeholder="Enter Phone Number"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
