import React, { useState, useEffect } from 'react';
import '../styles/FavoriteBooks.css';

const FavoriteBooks = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const booksFromStorage = localStorage.getItem('favourites');
    if (booksFromStorage) {
      const parsedBooks = JSON.parse(booksFromStorage);
      if (Array.isArray(parsedBooks) && parsedBooks.length > 0) {
        setFavoriteBooks(parsedBooks);
      } else {
        setFavoriteBooks([]);
      }
    }
  }, []);

  const removeFromFavorites = (bookId) => {
    const updatedBooks = favoriteBooks.filter((book) => book._id !== bookId);
    setFavoriteBooks(updatedBooks);
    localStorage.setItem('favourites', JSON.stringify(updatedBooks));
  };

  return (
    <div className="favorite-books">
      {favoriteBooks.length === 0 ? (
        <p className="no-books-message">No favorite books found.</p>
      ) : (
        <div className="books-list">
          {favoriteBooks.map((book) => (
            <div className="book-card" key={book._id}>
              <div className="book-image">
                {book.image && <img src={`http://localhost:5000/${book.image}`} alt={book.title} />}
              </div>
              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author"><strong>Author:</strong> {book.author}</p>
                <p className="book-price"><strong>Price:</strong> ${book.price}</p>
                <p className="book-isbn"><strong>ISBN:</strong> {book.isbn}</p>
                <a href={book.link} target="_blank" rel="noopener noreferrer" className="buy-link">Buy on Amazon</a>
                <button
                  className="remove-button"
                  onClick={() => removeFromFavorites(book._id)}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteBooks;
