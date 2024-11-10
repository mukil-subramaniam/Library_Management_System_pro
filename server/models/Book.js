// backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    isbn: { type: String, required: true },
    title: { type: String, required: true },
    bookId: { type: String, required: true },
    type: { type: String, required: true },
    author: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    edition: { type: String },
    price: { type: Number },
    pages: { type: Number },
    publisher: { type: String },
    quantity: { type: Number },
    description: { type: String },
    image: { type: String },
    link: { type: String }, // New field for link
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
