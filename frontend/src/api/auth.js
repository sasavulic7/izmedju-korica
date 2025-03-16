import API from "./index";

export const login = async (email, password) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await API.post("/auth/register", {
    username,
    email,
    password
  });
  return response.data;
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await API.get("/auth/profile", {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};

export const getUserBooks = async () => {
  const token = localStorage.getItem("token");
  const response = await API.get("/books/user/profile", {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};

export const getUserReviews = async () => {
  const token = localStorage.getItem("token");
  const response = await API.get("/auth/user-reviews", {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};

export const deleteAccount = async () => {
  const token = localStorage.getItem("token");
  const response = await API.delete("/auth/delete-account", {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};

// Primetio sam da postoji deleteBook funkcija i u books.js i u auth.js
// Ostavljam je ovde jer je možda koristiš iz oba fajla, ali razmisli o uklanjanju duplikata
export const deleteBook = async (bookId) => {
  const token = localStorage.getItem("token");
  const response = await API.delete(`/books/${bookId}`, {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};

// Takođe postoji deleteReview funkcija u oba fajla
export const deleteReview = async (reviewId) => {
  const token = localStorage.getItem("token");
  const response = await API.delete(`/books/review/${reviewId}`, {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};
