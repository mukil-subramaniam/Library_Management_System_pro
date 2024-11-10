const BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL according to your server

// Function to log in as Admin
export const adminLogin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Admin login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during admin login:', error);
    throw error;
  }
};

// Function to log in as User
export const userLogin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('User login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during user login:', error);
    throw error;
  }
};

// Function to sign up as User
export const userSignup = async (username, email, name, password, phone) => {
  try {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, name, password, phone }),
    });

    if (!response.ok) {
      throw new Error('User signup failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during user signup:', error);
    throw error;
  }
};

// Function to add a book
// Function to add a book
export const addBook = async (bookData) => {
    try {
      const formData = new FormData();
  
      // Append each field in bookData to formData
      Object.keys(bookData).forEach((key) => {
        console.log(`Appending to FormData: ${key} = ${bookData[key]}`); // Debugging line
        formData.append(key, bookData[key]);
      });
  
      const response = await fetch(`${BASE_URL}/books/add`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorResponse = await response.text(); // Log the response body for more context
        console.error('Failed to add book. Server response:', errorResponse);
        throw new Error('Failed to add book');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during book addition:', error);
      throw error;
    }
  };
  