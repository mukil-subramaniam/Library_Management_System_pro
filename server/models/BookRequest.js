const mongoose = require('mongoose');
const User = require('../models/userModel'); // Adjust the path as necessary

const bookRequestSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book',
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String, // Email field
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

// Pre-save middleware to fetch email based on username and set endDate to 15 days from today
bookRequestSchema.pre('validate', async function (next) {
  if (this.isNew) {
    try {
      // Fetch the user by username
      const user = await User.findOne({ username: this.username });
      if (user) {
        this.email = user.email; // Set the email from the user document
        console.log('Email fetched and set:', this.email); // Print the email to the console
      } else {
        console.error('User not found for username:', this.username);
        return next(new Error('User not found'));
      }

      // Set the endDate to be 15 days from the current date
      const currentDate = new Date();
      const endDate = new Date(currentDate.setDate(currentDate.getDate() + 15));
      this.endDate = endDate;
      console.log('End date set to:', this.endDate); // Print the endDate to the console

    } catch (error) {
      console.error('Error fetching user:', error);
      return next(error);
    }
  }
  next();
});

const BookRequest = mongoose.model('BookRequest', bookRequestSchema);

module.exports = BookRequest;
