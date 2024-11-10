import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BookDetail.css';

const BookDetail = () => {
  const { isbn } = useParams(); // Get the ISBN from the URL parameters
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  // Retrieve username from localStorage
  const username = localStorage.getItem('username');

  useEffect(() => {
    // Fetch book details when the component mounts or isbn changes
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${isbn}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data); // Set the fetched book details
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to load book details. Please try again later.');
      }
    };

    fetchBookDetails();
  }, [isbn]);

  // Handle request to get book
  const handleGetBook = async (book) => {
    try {
      const response = await fetch('http://localhost:5000/api/book-requests/req', {
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

  // Handle adding book to favorites
  const handleAddToFavorites = (book) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const newFavorite = { title: book.title, author: book.author };

    // Check if the book is already in favorites
    if (favorites.some((fav) => fav.title === book.title)) {
      alert('This book is already in your favorites!');
    } else {
      favorites.push(newFavorite);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Book added to favorites!');
    }
  };

  // Render loading state or error message
  if (error) {
    return <p className="error-message">{error}</p>; // Show error message if fetching fails
  }

  if (!book) {
    return <p>Loading book details...</p>; // Show loading message while data is being fetched
  }

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
     
      <p><strong>Description:</strong> {book.description}</p>
      {book.image && (
        <img src={`http://localhost:5000/${book.image}`} alt={`${book.title} cover`} />
      )}
      {book.link && (
        <p>
          <strong>Book Link:</strong>
          <a href={book.link} target="_blank" rel="noopener noreferrer">Click here</a>
        </p>
      )}

      {/* Button to handle adding book to favorites */}
      <button className="add-to-favorites-button" onClick={() => handleAddToFavorites(book)}>
        Add to Favorites
      </button>

      {/* Button to handle request to get the book */}
      <button className="get-book-button" onClick={() => handleGetBook(book)}>
        Request Book
      </button>
    </div>
  );
};

export default BookDetail;