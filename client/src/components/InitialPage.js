import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import library from '../assets/li.jpg';
import '../styles/InitialPage.css';

const InitialPage = () => {
  const [role, setRole] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation class after component mounts
    setIsLoaded(true);
  }, []);

  const handleRoleSelect = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    
    // Add a slight delay for better UX
    setTimeout(() => {
      if (selectedRole === 'admin') {
        navigate('/admin-login');
      } else if (selectedRole === 'user') {
        navigate('/user-login');
      }
    }, 300);
  };

  return (
    <div className="initial-page">
      <div className={`card ${isLoaded ? 'card-loaded' : ''}`}>
        <div className="card-content">
          <div className="logo-container">
            <div className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
          </div>
          
          <h1 className="title">Library Management System</h1>
          <p className="subtitle">Your gateway to knowledge and efficient book management</p>
          
          <div className="image-container">
            <img 
              src={library || "/placeholder.svg"} 
              alt="Library" 
              className="library-image" 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          
          <div className="select-wrapper">
            <select 
              value={role} 
              onChange={handleRoleSelect} 
              className="role-select"
            >
              <option value="" disabled>
                -- Select Your Role --
              </option>
              <option value="admin">Administrator</option>
              <option value="user">Library User</option>
            </select>
            <div className="select-arrow"></div>
          </div>
          
          <div className="info-text">
            <p>Please select your role to continue to the appropriate dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
