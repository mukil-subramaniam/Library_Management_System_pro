import React, { useState } from 'react';
import { addBook } from '../api/api'; // Adjust the import path as needed
import '../styles/AddBook.css'; // Import your CSS file

const AddBook = () => {
    const [bookData, setBookData] = useState({
        isbn: '',
        title: '',
        bookId: '',
        type: '',
        author: '',
        purchaseDate: '',
        edition: '',
        price: '',
        pages: '',
        publisher: '',
        quantity: '',
        description: '',
        image: null,
        link: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { id, value, type, files } = e.target;
        setBookData((prevData) => ({
            ...prevData,
            [id]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await addBook(bookData);
            console.log('Book added successfully:', result);
            setMessage('Book added successfully!');
        } catch (error) {
            console.error('Error adding book:', error);
            setMessage('Error adding book. Please try again.');
        }
    };

    return (
        <div className="background-container">
            <div className="add-book-container">
                <h2 id="t">Add a New Book</h2>
                {message && <p className="message">{message}</p>}
                <form className="add-book-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="isbn">ISBN No</label>
                        <input
                            type="text"
                            id="isbn"
                            value={bookData.isbn}
                            onChange={handleChange}
                            placeholder="Enter ISBN number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={bookData.title}
                            onChange={handleChange}
                            placeholder="Enter book title"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookId">Book ID</label>
                        <input
                            type="text"
                            id="bookId"
                            value={bookData.bookId}
                            onChange={handleChange}
                            placeholder="Enter book ID"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Category</label>
                        <select
                            id="type"
                            value={bookData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                        <option value="Historical Mystery">Historical Mystery</option>
                        <option value="Adventure Fiction">Adventure Fiction</option>
                        <option value="Children's Literature">Children's Literature</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Literary Fiction">Literary Fiction</option>
                        <option value="Biography">Biography</option>
                        <option value="Contemporary Literature">Contemporary Literature</option>
                        <option value="Graphic Novel">Graphic Novel</option>
                        <option value="Classics">Classics</option>
                        <option value="Memoir">Memoir</option>
                        <option value="Short Story">Short Story</option>
                        <option value="Dystopian">Dystopian</option>
                        <option value="Fairy Tale">Fairy Tale</option>
                        <option value="History">History</option>
                        <option value="Humor">Humor</option>
                        <option value="Magical Realism">Magical Realism</option>
                        <option value="Nonfiction">Nonfiction</option>
                        <option value="Young Adult">Young Adult</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            id="author"
                            value={bookData.author}
                            onChange={handleChange}
                            placeholder="Enter author name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="purchaseDate">Purchase Date</label>
                        <input
                            type="date"
                            id="purchaseDate"
                            value={bookData.purchaseDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edition">Edition</label>
                        <input
                            type="text"
                            id="edition"
                            value={bookData.edition}
                            onChange={handleChange}
                            placeholder="Enter book edition"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={bookData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pages">Pages</label>
                        <input
                            type="number"
                            id="pages"
                            value={bookData.pages}
                            onChange={handleChange}
                            placeholder="Enter page count"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="publisher">Publisher</label>
                        <input
                            type="text"
                            id="publisher"
                            value={bookData.publisher}
                            onChange={handleChange}
                            placeholder="Enter publisher"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            value={bookData.quantity}
                            onChange={handleChange}
                            placeholder="Enter quantity"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={bookData.description}
                            onChange={handleChange}
                            placeholder="Enter book description"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={handleChange}
                            accept="image/*"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="link">Link</label>
                        <input
                            type="url"
                            id="link"
                            value={bookData.link}
                            onChange={handleChange}
                            placeholder="Enter a URL link"
                        />
                    </div>
                    <button type="submit" className="submit-btn">Add Book</button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
