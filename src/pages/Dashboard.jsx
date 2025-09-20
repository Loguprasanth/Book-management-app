import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Typography,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useBooks } from "../hooks/useBooks";
import ConfirmDialog from "../components/common/ConfirmDialog";
import AddEditBookModal from "../components/common/AddEditBookModal";
import "../styles/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { isPending } from "@reduxjs/toolkit";

const Dashboard = () => {
  const { booksQuery, addBookMutation, updateBookMutation, deleteBookMutation } = useBooks();

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookData, setBookData] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

if (booksQuery?.isLoading) {
  return (
    <Box
      sx={{
        height: "100vh",        // Full viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

  if (booksQuery?.isError) {
    return <Typography color="error">Error fetching books: {booksQuery?.error?.message}</Typography>;
  }

  const filteredBooks =
    booksQuery?.data?.filter((book) => {
      const matchesSearch =
        book?.title?.toLowerCase()?.includes(search.toLowerCase()) ||
        book?.author?.toLowerCase()?.includes(search.toLowerCase());
      const matchesGenre = genre ? book?.genre === genre : true;
      const matchesStatus = status ? book?.status === status : true;
      return matchesSearch && matchesGenre && matchesStatus;
    }) || [];

  const paginatedBooks = filteredBooks.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleEdit = (book) => {
    setBookData(book ?? {});
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (!data) return;
    const mutation = data.id
      ? updateBookMutation.mutate(data.id ? { id: data.id, book: data } : {}, {
          onError: (err) =>
            setSnackbar({ open: true, message: err?.message || "Update failed", severity: "error" }),
          onSuccess: () =>
            setSnackbar({ open: true, message: "Book updated successfully", severity: "success" }),
        })
      : addBookMutation.mutate(data, {
          onError: (err) =>
            setSnackbar({ open: true, message: err?.message || "Add failed", severity: "error" }),
          onSuccess: () =>
            setSnackbar({ open: true, message: "Book added successfully", severity: "success" }),
        });

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };
  

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteBookMutation.mutate(deleteId)
     
    setConfirmOpen(false);
  };

  return (
    <Box>
      {/* Filters */}
      <Box className="filters-section">
        <Box className="filters-grid">
          <Box className="search-bar">
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-left" />,
              }}
            />
          </Box>
          <Box className="filters-container">
            <FormControl size="small">
              <InputLabel>Genre</InputLabel>
              <Select value={genre} onChange={(e) => setGenre(e.target.value)} label="Genre">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="fiction">Fiction</MenuItem>
                <MenuItem value="non-fiction">Non-fiction</MenuItem>
                <MenuItem value="sci-fi">Sci-Fi</MenuItem>
                <MenuItem value="romance">Romance</MenuItem>
                <MenuItem value="mystery">Mystery</MenuItem>
                <MenuItem value="biography">Biography</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel>Status</InputLabel>
              <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="issued">Issued</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Books List */}
      <Box id="books-list-section" className="books-list-section">
        {/* Table for md screens */}
        <Box className="books-table" sx={{ display: { xs: "none", md: "block" } }}>
    <TableContainer sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Author</strong></TableCell>
            <TableCell><strong>Genre</strong></TableCell>
            <TableCell><strong>Published Year</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {booksQuery.isLoading ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <CircularProgress size={24} />
              </TableCell>
            </TableRow>
          ) : paginatedBooks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            paginatedBooks.map((book) => (
              <TableRow key={book?.id} hover>
                <TableCell>{book?.title}</TableCell>
                <TableCell>{book?.author}</TableCell>
                <TableCell>{book?.genre}</TableCell>
                <TableCell>{book?.year}</TableCell>
                <TableCell>
                  <Chip
                    label={book?.status}
                    color={book?.status?.toLowerCase() === "available" ? "success" : "warning"}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary" onClick={() => handleEdit(book)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(book?.id)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>

        {/* Grid for xs screens */}
        <Grid container spacing={2} sx={{ display: { xs: "grid", md: "none" } }}>
    {booksQuery.isLoading ? (
      <Grid item xs={12} textAlign="center">
        <CircularProgress />
      </Grid>
    ) : paginatedBooks.length === 0 ? (
      <Grid item xs={12} textAlign="center">
        <Typography>No data available</Typography>
      </Grid>
    ) : (
      paginatedBooks.map((book) => (
        <Grid item xs={12} sm={6} key={book?.id}>
          <Paper className="book-card" elevation={1}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography fontWeight="bold">{book?.title}</Typography>
              <span className={`status-badge ${book?.status?.toLowerCase() === "available" ? "available" : "issued"}`}>
                {book?.status}
              </span>
            </Box>
            <Typography variant="body2" color="text.secondary">{book?.author}</Typography>
            <Typography variant="caption" color="text.secondary">{book?.genre} • {book?.year}</Typography>
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <IconButton size="small" color="primary" onClick={() => handleEdit(book)}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => handleDelete(book?.id)}>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      ))
    )}
  </Grid>

        {/* Pagination */}
        <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "space-between", width: "100%" }}>
            <Button
              variant="outlined"
              size="small"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="small"
              disabled={page * rowsPerPage >= filteredBooks.length}
              onClick={() => setPage((prev) => (prev * rowsPerPage >= filteredBooks.length ? prev : prev + 1))}
            >
              Next
            </Button>
          </Box>

          <Box sx={{ display: { xs: "none", md: "block" }, justifyContent: "flex-end", width: "100%" }}>
            <TablePagination
              component="div"
              count={filteredBooks.length}
              page={page - 1}
              onPageChange={(e, newPage) => setPage(newPage + 1)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(1); }}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Box>
        </Box>
      </Box>

      {/* Confirm Delete */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Book"
        message="Are you sure you want to delete this book?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
        isLoading={deleteBookMutation.isPending}
      />

      {/* Add/Edit Modal */}
      <AddEditBookModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        handleSubmit={handleSave}
        bookData={bookData ?? {}}
        setBookData={setBookData}
      />

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
