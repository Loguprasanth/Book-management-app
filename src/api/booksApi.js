import api from "./axios";

// CRUD APIs for books
export const getBooks = async () => {
  const { data } = await api.get("/books");
  return data;
};

export const addBook = async (book) => {
  const { data } = await api.post("/books", book);
  return data;
};

export const updateBook = async (id, book) => {
  const { data } = await api.put(`/books/${id}`, book);
  return data;
};

export const deleteBook = async (id) => {
  await api.delete(`/books/${id}`);
  return id;
};
