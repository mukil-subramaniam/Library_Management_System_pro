// backend/controllers/bookController.js
const Book = require('../models/Book');

exports.addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        console.log(newBook)
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add book', error: error.message });
    }
};
