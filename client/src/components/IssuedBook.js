// src/components/IssuedBooks.js
import React, { useEffect, useState } from 'react';
import '../styles/IssuedBooks.css'; // Uncomment and customize if you have a CSS file

const IssuedBooks = () => {
  const [bookRequests, setBookRequests] = useState([]);
  const username = localStorage.getItem('username'); // Get the username from local storage

  useEffect(() => {
    // Fetch book requests from the API
    fetch('http://localhost:5000/api/book-requests/data')
      .then(response => response.json())
      .then(data => {
        // Filter the book requests to show only the current user's requests
        const userRequests = data.filter(request => request.username === username);
        setBookRequests(userRequests);
      })
      .catch(error => {
        console.error('Error fetching book requests:', error);
      });
  }, [username]);

  return (
    <div className="issued-books">
      <h2>Issued Books</h2>
      <table className="issued-books-table">
        <thead>
          <tr>
            <th>BookId</th>
            <th>Book Title</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookRequests.map((request, index) => (
            <tr key={index}>
              <td>{request.bookId}</td>
              <td>{request.bookTitle}</td>
              <td>{request.username}</td>
              {/* Apply a class conditionally based on the action */}
              <td className={request.action === 'approved' ? 'action-approved' : ''}>
                {request.action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuedBooks;
