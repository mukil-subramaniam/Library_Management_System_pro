import React, { useEffect, useState } from 'react';
import '../styles/ViewRequests.css';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/book-requests/data');
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching book requests:', error);
      }
    };

    fetchRequests();
  }, []);

  // Function to handle approval of a request
  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/book-requests/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'approved' }),
      });

      if (response.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id ? { ...request, action: 'approved', isHandled: true } : request
          )
        );
      } else {
        console.error('Failed to approve the request:', response.statusText);
      }
    } catch (error) {
      console.error('Error approving the request:', error);
    }
  };

  // Function to handle rejection of a request
  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/book-requests/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'rejected' }),
      });

      if (response.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id ? { ...request, action: 'rejected', isHandled: true } : request
          )
        );
      } else {
        console.error('Failed to reject the request:', response.statusText);
      }
    } catch (error) {
      console.error('Error rejecting the request:', error);
    }
  };

  return (
    <div className="view-requests">
      
      <table className="requests-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Book ID</th>
            <th>Book Title</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request._id}>
                <td>{request.username}</td>
                <td>{request.bookId}</td>
                <td>{request.bookTitle}</td>
                <td>
                  {request.action === 'pending' ? (
                    <div className="action-buttons">
                      <button className="approve-button" onClick={() => handleApprove(request._id)}>Approve</button>
                      <button className="reject-button" onClick={() => handleReject(request._id)}>Reject</button>
                    </div>
                  ) : (
                    <span className="action-status">Action already performed</span>
                  )}
                </td>
                <td>{request.action}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-requests">No book requests available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRequests;
