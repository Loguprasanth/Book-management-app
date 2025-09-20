import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/books/bookSlice";

export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;
