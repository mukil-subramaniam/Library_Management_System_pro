import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileIcon from '../assets/profile-icon.png';
import '../styles/HomePage.css';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve the username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch all books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://library-management-system-pro-backend.onrender.com/all');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching books');
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Handle the search query input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Filter books based on the search query
    if (query.trim() !== '') {
      const lowerQuery = query.toLowerCase();
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerQuery) ||
          book.isbn.includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery)
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  };

  // Handle the search button click
  const handleSearchClick = () => {
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerQuery) ||
          book.isbn.includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery)
      );
      setFilteredBooks(filtered);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Handle book click to navigate to book details page using ISBN
  const handleBookClick = (isbn) => {
    navigate(`/book-details/${isbn}`);
  };

  return (
    <div className="app-container">
      <div className="home-page">
        {/* Overlay for when sidebar is open */}
        {isSidebarOpen && <div className="overlay fade-in" onClick={closeSidebar}></div>}
        
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open slide-in' : ''}`}>
          <div className="sidebar-header">
            <h2 className="sidebar-title">Library Management</h2>
            <button className="close-btn" onClick={closeSidebar}>
              <span>&times;</span>
            </button>
          </div>
          <div className="sidebar-divider"></div>
          <ul className="sidebar-menu">
            <li>
              <Link to="/view-book" className="sidebar-link">
                <span className="sidebar-icon">📚</span>
                <span>View Books</span>
              </Link>
            </li>
            <li>
              <Link to="/issued-book" className="sidebar-link">
                <span className="sidebar-icon">📖</span>
                <span>Issued Books</span>
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="sidebar-link">
                <span className="sidebar-icon">⭐</span>
                <span>View Favorites</span>
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="main-content fade-in">
          <header className="header">
            {/* Left - Toggle Button */}
            <div className="header-left">
              <button className="toggle-btn" onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            
            {/* Center - Search Bar */}
            <div className="header-center">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search books by title, author, or ISBN..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <button className="search-btn" onClick={handleSearchClick}>
                  <span className="search-icon">🔍</span>
                  <span>Search</span>
                </button>
              </div>
              
              {/* Display suggestions if search results exist */}
              {searchQuery && filteredBooks.length > 0 && (
                <div className="search-suggestions">
                  <ul>
                    {filteredBooks.map((book) => (
                      <li key={book._id} onClick={() => handleBookClick(book.isbn)}>
                        <span className="suggestion-title">{book.title}</span>
                        <span className="suggestion-author">by {book.author}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Right - Username & Logout */}
            <div className="header-right">
              <div className="user-info">
                <div className="profile-container">
                  <img src={profileIcon || "/placeholder.svg"} alt="Profile" className="profile-icon" />
                </div>
                <span className="username">{username}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </header>

          <div className="content-area">
            {/* Show loading or error state */}
            {loading && (
              <div className="loading-container fade-in">
                <div className="loading-spinner"></div>
                <p>Loading books...</p>
              </div>
            )}
            
            {error && (
              <div className="error-container fade-in">
                <p className="error-message">{error}</p>
                <button className="retry-btn" onClick={() => window.location.reload()}>
                  Retry
                </button>
              </div>
            )}
            
            {/* Main content placeholder */}
            {!loading && !error && (
              <div className="welcome-container fade-in">
                <h1 className="welcome-title">Welcome to the Library Management System</h1>
                <p className="welcome-message">
                  Use the sidebar to navigate through different sections or search for books above.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
