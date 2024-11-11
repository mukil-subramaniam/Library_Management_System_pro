import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileIcon from '../assets/profile-icon.png';
import '../styles/HomePage.css';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]); // All books from the API
  const [filteredBooks, setFilteredBooks] = useState([]); // Filtered books based on search
  const [loading, setLoading] = useState(false); // Loading state for API request
  const [error, setError] = useState(null); // For error handling
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
  }, []); // Runs once when the component mounts

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
      setFilteredBooks([]); // If search query is empty, clear the filtered results
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
    navigate('/'); // Redirect to login page
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
    <div className="home-page">
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeSidebar}>
          ✖
        </button>
        <h2 className="sidebar-title">Library Management</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/view-book" className="sidebar-link">
              View Books
            </Link>
          </li>
          <li>
            <Link to="/issued-book" className="sidebar-link">
              Issued Books
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="sidebar-link">
              View Favorites
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          {/* Left - Toggle Button */}
          <div className="header-left">
            <button className="toggle-btn" onClick={toggleSidebar}>
              ☰
            </button>
          </div>
          {/* Center - Search Bar */}
          <div className="header-center">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search the books"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button className="search-btn" onClick={handleSearchClick}>
                Search
              </button>
            </div>
            {/* Display suggestions if search results exist */}
            {searchQuery && filteredBooks.length > 0 && (
              <div className="search-suggestions">
                <ul>
                  {filteredBooks.map((book) => (
                    <li key={book._id} onClick={() => handleBookClick(book.isbn)}>
                      <span className="suggestion-link">
                        {book.title} by {book.author}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Right - Username & Logout */}
          <div className="header-right">
            <div className="user-info">
              <img src={profileIcon} alt="Profile" className="profile-icon" />
              <span className="username">{username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="content-area">
          {/* Show loading or error state */}
          {loading && <p>Loading books...</p>}
          {error && <p>{error}</p>}
          {/* Main content goes here */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
