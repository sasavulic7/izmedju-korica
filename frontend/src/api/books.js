import API from "./index";

// Base URL for the deployed backend
const BASE_URL = "https://izmedju-korica.vercel.app/api/books";

// Updated API functions for Vercel deployment
export const getAllBooks = async () => {
  const response = await API.get(`${BASE_URL}/books`);
  return response.data;
};

export const getBookById = async (id) => {
  const response = await API.get(`${BASE_URL}/books/${id}`);
  return response.data;
};

export const createBook = async (bookData) => {
  const token = localStorage.getItem("token");
  const response = await API.post(`${BASE_URL}/books`, bookData, {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};

export const deleteBook = async (bookId) => {
  const token = localStorage.getItem("token");
  const response = await API.delete(`${BASE_URL}/books/${bookId}`, {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};

export const addReview = async (bookId, reviewData) => {
  const token = localStorage.getItem("token");
  const response = await API.post(`${BASE_URL}/books/${bookId}/review`, reviewData, {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const token = localStorage.getItem("token");
  const response = await API.delete(`${BASE_URL}/books/review/${reviewId}`, {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};
