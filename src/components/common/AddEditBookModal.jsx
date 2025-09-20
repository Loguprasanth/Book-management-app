// src/components/AddEditBookModal.jsx
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { useBooks } from "../../hooks/useBooks"; 
import "../../styles/AddEditBookModal.css";

const AddEditBookModal = ({ open, handleClose, bookData }) => {
  const {
    addBookMutation,
    updateBookMutation,
  } = useBooks();

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      year: "",
      status: "",
    },
  });

  // When editing, populate the form
  useEffect(() => {
    if (bookData) {
      reset({
        title: bookData.title || "",
        author: bookData.author || "",
        genre: bookData.genre || "",
        year: bookData.year || "",
        status: bookData.status || "",
      });
    } else {
      reset({
        title: "",
        author: "",
        genre: "",
        year: "",
        status: "",
      });
    }
  }, [bookData, reset]);

  // Submit handler
  const onSubmit = (data) => {
    if (bookData?.id) {
      // Update book
      updateBookMutation.mutate({ id: bookData.id, book: data }, {
        onSuccess: () => handleClose(),
      });
    } else {
      // Add book
      addBookMutation.mutate(data, {
        onSuccess: () => handleClose(),
      });
    }
  };


  console.log("is laoding",updateBookMutation.status)

  // Loading state
  const isLoading =  addBookMutation.status === "loading" ||
  updateBookMutation.status === "loading"
 




console.log(isLoading)
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ className: "book-modal-paper", sx: { borderRadius: 2, p: 2 } }}
    >
      {/* Header */}
      <div className="book-modal-header">
        <Typography variant="h6" className="book-modal-title">
          {bookData?._id ? "Edit Book" : "Add New Book"}
        </Typography>
        <IconButton className="book-modal-close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>

      {/* Form */}
      <DialogContent>
        <Box component="form" className="book-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                label="Title"
                fullWidth
                size="small"
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
                {...field}
              />
            )}
          />

          {/* Author */}
          <Controller
            name="author"
            control={control}
            rules={{ required: "Author is required" }}
            render={({ field }) => (
              <TextField
                label="Author"
                fullWidth
                size="small"
                margin="normal"
                error={!!errors.author}
                helperText={errors.author?.message}
                {...field}
              />
            )}
          />

          {/* Genre */}
          <Controller
            name="genre"
            control={control}
            rules={{ required: "Genre is required" }}
            render={({ field }) => (
              <TextField
                select
                label="Genre"
                fullWidth
                size="small"
                margin="normal"
                error={!!errors.genre}
                helperText={errors.genre?.message}
                {...field}
              >
                <MenuItem value="">Select Genre</MenuItem>
                <MenuItem value="fiction">Fiction</MenuItem>
                <MenuItem value="non-fiction">Non-fiction</MenuItem>
                <MenuItem value="sci-fi">Sci-Fi</MenuItem>
                <MenuItem value="romance">Romance</MenuItem>
                <MenuItem value="mystery">Mystery</MenuItem>
                <MenuItem value="biography">Biography</MenuItem>
              </TextField>
            )}
          />

          {/* Year */}
          <Controller
            name="year"
            control={control}
            rules={{
              required: "Published year is required",
              min: { value: 1000, message: "Year cannot be less than 1000" },
              max: { value: new Date().getFullYear(), message: "Year cannot be in the future" },
            }}
            render={({ field }) => (
              <TextField
                type="number"
                label="Published Year"
                fullWidth
                size="small"
                margin="normal"
                error={!!errors.year}
                helperText={errors.year?.message}
                {...field}
              />
            )}
          />

          {/* Status */}
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <TextField
                select
                label="Status"
                fullWidth
                size="small"
                margin="normal"
                error={!!errors.status}
                helperText={errors.status?.message}
                {...field}
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="issued">Issued</MenuItem>
              </TextField>
            )}
          />

          {/* Footer buttons */}
          <Box className="book-modal-footer" sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="save-btn"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={20} color="inherit" /> : bookData?.id ? "Update Book" : "Save Book"}
            </button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditBookModal;
