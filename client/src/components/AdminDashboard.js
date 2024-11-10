import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user/users/count');
                if (!response.ok) {
                    throw new Error('Failed to fetch user count');
                }
                const data = await response.json();
                setTotalUsers(data.totalUsers);
            } catch (error) {
                console.error('Error fetching user count:', error);
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
                <button className="toggle-sidebar" onClick={toggleSidebar}>☰</button>
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
                        <p>{totalUsers}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
