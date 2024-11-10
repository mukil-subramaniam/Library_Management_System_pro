const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/BookRoutes'); // Import BookRoutes
const cors = require('cors'); // Import CORS
const bookRequestRoutes = require('./routes/bookRequests'); 

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files for image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/books', bookRoutes); // Use book routes with '/api/books' prefix

// New route to handle "Get Book" requests
app.use('/api/book-requests', bookRequestRoutes);
// Home Route
app.get('/', (req, res) => {
  res.send('Library Management System API');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
