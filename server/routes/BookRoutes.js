const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Book = require('../models/Book');

// Ensure 'uploads/' directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Directory to save images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    },
});

const upload = multer({ storage });

// Route to add a new book to MongoDB with image upload
router.post('/add', upload.single('image'), async (req, res) => {
    console.log('Book Received');
    
    try {
        const {
            isbn,
            title,
            bookId,
            type,
            author,
            purchaseDate,
            edition,
            price,
            pages,
            publisher,
            quantity,
            description,
            link // Extract link field from request body
        } = req.body;

        const newBook = new Book({
            isbn,
            title,
            bookId,
            type,
            author,
            purchaseDate,
            edition,
            price,
            pages,
            publisher,
            quantity,
            description,
            image: req.file ? `uploads/${req.file.filename}` : null, // Save image path for serving
            link // Include link field
        });

        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Error adding book', error: error.message });
    }
});

// Route to get all books from MongoDB
router.get('/all', async (req, res) => {
    try {
        const books = await Book.find(); // Retrieve all books
        res.status(200).json(books); // Send books as JSON
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
});

// Route to update book details based on title
router.put('/update/:title', upload.single('image'), async (req, res) => {
    const { title } = req.params;
    const {
        isbn,
        author,
        type,
        price,
        publisher,
        quantity,
        description,
        link
    } = req.body;

    try {
        // Find the book by title
        const book = await Book.findOne({ title });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Update the book fields
        book.isbn = isbn || book.isbn;
        book.author = author || book.author;
        book.type = type || book.type;
        book.price = price || book.price;
        book.publisher = publisher || book.publisher;
        book.quantity = quantity || book.quantity;
        book.description = description || book.description;
        book.link = link || book.link;

        // If a new image is uploaded, replace the old one
        if (req.file) {
            // Remove the old image file if it exists
            if (book.image) {
                fs.unlinkSync(path.join(__dirname, '..', book.image));
            }
            book.image = `uploads/${req.file.filename}`;
        }

        // Save the updated book
        await book.save();
        res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Error updating book', error: error.message });
    }
});

// Route to delete a book based on title
router.delete('/delete/:title', async (req, res) => {
    const { title } = req.params;

    try {
        // Find the book by title and remove it
        const book = await Book.findOneAndDelete({ title });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // If the book had an image, delete the image file
        if (book.image) {
            fs.unlinkSync(path.join(__dirname, '..', book.image));
        }

        res.status(200).json({ message: `Book "${title}" deleted successfully` });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
});

// Route to get a specific book by its ISBN
router.get('/:isbn', async (req, res) => {
    const { isbn } = req.params;
    try {
        const book = await Book.findOne({ isbn });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching book details', error: err });
    }
});

module.exports = router;
