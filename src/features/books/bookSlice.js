import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBook: null, // for edit
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
});

export const { setSelectedBook, clearSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
