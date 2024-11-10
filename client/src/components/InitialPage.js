import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import library from '../assets/library.jpg';
import '../styles/InitialPage.css';

const InitialPage = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      navigate('/admin-login');
    } else if (selectedRole === 'user') {
      navigate('/user-login');
    }
  };

  return (
    <div className="initial-page">
      <div className="content-container">
        <h2>Welcome to the Library Management System</h2>
        <p>Your gateway to managing and exploring books efficiently.</p>
        <p>Please select your role to proceed:</p>
        <img src={library} alt="Library" className="library-image" />
        <select value={role} onChange={handleRoleSelect} className="role-select">
          <option value="" disabled>
            -- Select Role --
          </option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
    </div>
  );
};

export default InitialPage;
