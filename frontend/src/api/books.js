import API from "./index";

// Base URL for the deployed backend
const BASE_URL = "https://izmedju-korica.vercel.app/api/books";

// Updated API functions for Vercel deployment
export const getAllBooks = async () => {
  const response = await API.get(BASE_URL); // Koristi BASE_URL direktno
  return response.data;
};

export const getBookById = async (id) => {
  const response = await API.get(`${BASE_URL}/${id}`); // Koristi BASE_URL i dodaj ID
  return response.data;
};

export const createBook = async (bookData) => {
  const token = localStorage.getItem("token");
  const response = await API.post(BASE_URL, bookData, { // Koristi BASE_URL direktno
    headers: {
      "x-auth-token": token,
    },
  });
  return response.data;
};

export const deleteBook = async (bookId) => {
  const token = localStorage.getItem("token");
  const response = await API.delete(`${BASE_URL}/${bookId}`, { // Koristi BASE_URL i dodaj bookId
    headers: {
      "x-auth-token": token,
    },
  });
  return response.data;
};

export const addReview = async (bookId, reviewData) => {
  const token = localStorage.getItem("token");
  const response = await API.post(`${BASE_URL}/${bookId}/review`, reviewData, { // Koristi BASE_URL i dodaj bookId
    headers: {
      "x-auth-token": token,
    },
  });
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const token = localStorage.getItem("token");
  const response = await API.delete(`${BASE_URL}/review/${reviewId}`, { // Koristi BASE_URL i dodaj reviewId
    headers: {
      "x-auth-token": token,
    },
  });
  return response.data;
};
