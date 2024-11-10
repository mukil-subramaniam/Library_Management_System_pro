import React, { useEffect, useState } from 'react';
import '../styles/ManageBooks.css';
const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    type: '',
    price: '',
    publisher: '',
    quantity: '',
    description: '',
    link: '',
    image: null,
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/books/all')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (bookTitle) => {
    fetch(`http://localhost:5000/api/books/delete/${bookTitle}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setBooks(books.filter((book) => book.title !== bookTitle));
        alert(`Book "${bookTitle}" deleted successfully`);
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
        alert('Error deleting book');
      });
  };

  const handleEdit = (bookTitle) => {
    const book = books.find((book) => book.title === bookTitle);
    setCurrentBook(book);
    setFormData({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      type: book.type,
      price: book.price,
      publisher: book.publisher,
      quantity: book.quantity,
      description: book.description,
      link: book.link,
      image: null,
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    fetch(`http://localhost:5000/api/books/update/${currentBook.title}`, {
      method: 'PUT',
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((updatedBook) => {
        setBooks(
          books.map((book) =>
            book.title === updatedBook.title ? updatedBook : book
          )
        );
        alert(`Book "${updatedBook.title}" updated successfully`);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating book:', error);
        alert('Error updating book');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (books.length === 0) {
    return <div>No books available</div>;
  }

  return (
    <div className="manage-books">
      <h3>Manage Books</h3>
      {isEditing ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h4>Edit Book</h4>
          <div>
            <label>ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Publisher</label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Image</label>
            <input type="file" name="image" onChange={handleImageChange} />
          </div>
          <button type="submit">Update Book</button>
        </form>
      ) : (
        <table className="books-table">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Type</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Link</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.title}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.type}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.price}</td>
                <td>{book.quantity}</td>
                <td>{book.description}</td>
                <td>
                  <a href={book.link} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
                <td>
                  <img
                    src={`http://localhost:5000/${book.image}`}
                    alt={book.title}
                    style={{ width: '100px' }}
                  />
                </td>
                <td>
                  <button onClick={() => handleEdit(book.title)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(book.title)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageBooks;
