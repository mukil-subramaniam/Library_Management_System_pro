import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ViewBook.css';

// Sample categories with their respective icons
const categories = [
  { name: "Fantasy", icon: "fas fa-book" },
  { name: "Thriller", icon: "fas fa-skull-crossbones" },
  { name: "Science Fiction", icon: "fas fa-rocket" },
  { name: "Romance", icon: "fas fa-heart" },
  { name: "Historical Mystery", icon: "fas fa-clock" },
  { name: "Adventure Fiction", icon: "fas fa-compass" },
  { name: "Children's Literature", icon: "fas fa-child" },
  { name: "Mystery", icon: "fas fa-question-circle" },
  { name: "Fiction", icon: "fas fa-feather-alt" },
  { name: "Biography", icon: "fas fa-user" },
  { name: "Contemporary Literature", icon: "fas fa-building" },
  { name: "Graphic Novel", icon: "fas fa-image" },
  { name: "Classics", icon: "fas fa-book-open" },
  { name: "Short Story", icon: "fas fa-scroll" },
  { name: "Dystopian", icon: "fas fa-exclamation-triangle" },
  { name: "Fairy Tale", icon: "fas fa-magic" },
  { name: "History", icon: "fas fa-history" },
  { name: "Humor", icon: "fas fa-laugh" },
  { name: "Magical Realism", icon: "fas fa-gem" },
  { name: "Nonfiction", icon: "fas fa-bookmark" },
  { name: "Young Adult", icon: "fas fa-graduation-cap" }
];

const ViewBook = () => {
  const navigate = useNavigate();

  const handleFileClick = (category) => {
    navigate(`/books/${category}`);
  };

  return (
    <div className="view-book">
      {categories.map((category) => (
        <div
          key={category.name}
          className="file"
          onClick={() => handleFileClick(category.name)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleFileClick(category.name);
            }
          }}
        >
          <i className={category.icon}></i>
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default ViewBook;
