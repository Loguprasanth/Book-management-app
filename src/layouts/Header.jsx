import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedBook } from "../features/books/bookSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddEditBookModal from "../components/common/AddEditBookModal"; // Import the modal
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    status: "",
  });

  const handleAddBook = () => {
    dispatch(setSelectedBook(null));
    setBookData({ title: "", author: "", genre: "", year: "", status: "" });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    console.log("Saving Book:", bookData);
    // Later: dispatch API call or mutation here
    setOpenModal(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Left section */}
          <div className="header-left">
            <FontAwesomeIcon icon={faBook} className="header-icon" />
            <h1 className="header-title">Book Management</h1>
          </div>

          {/* Right section */}
          <div className="header-right">
            <button className="add-book-btn" onClick={handleAddBook}>
              <FontAwesomeIcon icon={faPlus} className="btn-icon" />
              <span className="btn-text">Add Book</span>
            </button>
          </div>
        </div>
      </header>

      {/* Add/Edit Book Modal */}
      <AddEditBookModal
        open={openModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        bookData={bookData}
        setBookData={setBookData}
      />
    </>
  );
};

export default Header;
