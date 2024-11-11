import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState(null); // Error state for handling API errors

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch('https://library-management-system-pro-backend.onrender.com/api/user/users/count');
        if (!response.ok) {
          throw new Error('Failed to fetch user count');
        }
        const data = await response.json();
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.error('Error fetching user count:', error);
        setError('Unable to fetch the user count. Please try again later.');
      }
    };

    fetchTotalUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <button
          className="toggle-sidebar"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'} // Added aria-label for accessibility
        >
          ☰
        </button>
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <span className="admin-text">Admin</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <h2>Total Users</h2>
            {error ? (
              <p className="error-message">{error}</p> // Show error message if data fetch fails
            ) : (
              <p>{totalUsers}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
