// src/components/books/BooksList.jsx
import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton,
  Grid, Card, CardContent, Typography, Box, Button
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const BooksList = ({ books = [], onEdit, onDelete }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // handle screen resize for responsive view
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      {/* Desktop Table View */}
      {!isMobile && (
        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Author</strong></TableCell>
                <TableCell><strong>Year</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.year}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => onEdit(book)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(book)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Mobile Card View */}
      {isMobile && (
        <Grid container spacing={2}>
          {books.map((book, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography color="text.secondary">{book.author}</Typography>
                  <Typography variant="body2">Year: {book.year}</Typography>

                  <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<Edit />}
                      onClick={() => onEdit(book)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => onDelete(book)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BooksList;
