import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'; // Import sidebar styles

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>✖</button>
      <h3>Menu</h3>
      <ul>
        <li>
          <Link to="/add-book" onClick={toggleSidebar}>Add Book</Link>
        </li>
        <li>
          <Link to="/view-requests" onClick={toggleSidebar}>View Book Requests</Link>
        </li>
        <li>
          <Link to="/manage-books" onClick={toggleSidebar}>Manage Books</Link> {/* New Manage Books link */}
        </li>
        <li>
          <Link to="/" onClick={toggleSidebar}>Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
