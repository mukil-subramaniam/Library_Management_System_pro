import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BookCategory.css';

const BookCategory = () => {
  const { id } = useParams(); // Get the category id from the URL
  const [books, setBooks] = useState([]); // State to hold books of the selected category
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors
  const [username, setUsername] = useState(localStorage.getItem('username')); // State for username

  useEffect(() => {
    if (!username) {
      setError('Please log in to view and request books.');
      setLoading(false);
      return; // Don't fetch if no username is found
    }

    const fetchBooksByCategory = async () => {
      try {
        const response = await fetch('https://library-management-system-pro-backend.onrender.com/api/books/all'); // Fetch all books
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Handle network errors
        }
        const data = await response.json(); // Parse JSON response
        const filteredBooks = data.filter((book) => book.type === id); // Filter books by the selected category
        setBooks(filteredBooks); // Update state with filtered books
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching books:', error); // Log errors
        setError(error); // Update error state
        setLoading(false); // Set loading to false
      }
    };

    fetchBooksByCategory(); // Call the fetch function
  }, [id, username]); // Fetch when the category or username changes

  const handleGetBook = async (book) => {
    try {
      const response = await fetch('https://library-management-system-pro-backend.onrender.com/api/book-requests/req', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: book._id,
          username: username,
          bookTitle: book.title,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send request to admin');
      }

      alert('Request sent to admin successfully!');
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request to admin');
    }
  };

  const handleAddToFavourites = (book) => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || []; // Retrieve existing favourites or initialize an empty array
    const isAlreadyFavourited = favourites.some(favBook => favBook._id === book._id);

    if (isAlreadyFavourited) {
      alert('This book is already in your favourites!');
      return;
    }

    favourites.push(book); // Add the book to the favourites array
    localStorage.setItem('favourites', JSON.stringify(favourites)); // Store the updated favourites in localStorage
    alert('Book added to favourites!');
  };

  // Render loading state or error message
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="book-category">
      <h2>Books in {id} Category</h2>
      {books.length === 0 ? (
        <p>No books found in this category.</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <div className="book-card" key={book._id}>
              {book.image && (
                <img
                  src={`https://library-management-system-pro-backend.onrender.com/${book.image}`}
                  alt={book.title}
                  className="book-image"
                />
              )}
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">Author: {book.author}</p>
              <p className="book-quantity">Quantity Available: {book.quantity}</p>
              {book.link && (
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  <button className="view-link-button">View Book</button>
                </a>
              )}
              <button
                className="get-book-button"
                onClick={() => handleGetBook(book)}
              >
                Get Book
              </button>
              <button
                className="add-to-favourites-button"
                onClick={() => handleAddToFavourites(book)}
              >
                Add to Favourites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookCategory;
