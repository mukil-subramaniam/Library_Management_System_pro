import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddBook from './components/AddBook'; // Import the AddBook component
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import BookCategory from './components/BookCategory'; // Import the BookCategory component
import Homepage from './components/HomePage';
import InitialPage from './components/InitialPage';
import IssuedBooks from './components/IssuedBook';
import Signup from './components/Signup'; // Import the Signup component
import UserLogin from './components/UserLogin';
import ViewBook from './components/viewBook';
import ViewRequests from './components/ViewRequests';
import ManageBook from './components/ManageBooks';
import FavoritesPage from './components/FavoritesPage';
import BookDetails from './components/BookDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/view-book" element={<ViewBook />} />
        <Route path="/view-requests" element={<ViewRequests />} />
        <Route path="/books/:id" element={<BookCategory />} />
        <Route path="/issued-book" element={<IssuedBooks />} />
        <Route path="/manage-books" element={<ManageBook />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        
        {/* Corrected Route for BookDetails, now uses 'isbn' */}
        <Route path="/book-details/:isbn" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
