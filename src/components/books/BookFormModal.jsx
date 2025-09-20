import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const genres = ["Fiction", "Non-fiction", "Sci-Fi", "Romance", "Mystery", "Biography"];
const statuses = ["Available", "Issued"];

export default function BookFormModal({ open, onClose, onSubmit, initialData }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      author: "",
      genre: "",
      year: "",
      status: "",
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edit Book" : "Add New Book"}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent dividers className="space-y-4">
          {/* Title */}
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
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
                {...field}
                label="Author"
                fullWidth
                error={!!errors.author}
                helperText={errors.author?.message}
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
                {...field}
                select
                label="Genre"
                fullWidth
                error={!!errors.genre}
                helperText={errors.genre?.message}
              >
                {genres.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* Published Year */}
          <Controller
            name="year"
            control={control}
            rules={{
              required: "Published year is required",
              min: { value: 1000, message: "Enter a valid year" },
              max: { value: new Date().getFullYear(), message: "Year cannot be in future" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Published Year"
                fullWidth
                error={!!errors.year}
                helperText={errors.year?.message}
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
                {...field}
                select
                label="Status"
                fullWidth
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                {statuses.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Save Book
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
