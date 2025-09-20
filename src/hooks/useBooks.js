import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBooks, addBook, updateBook, deleteBook } from "../api/booksApi";
import { toast } from "react-toastify";

export const useBooks = () => {
  const queryClient = useQueryClient();

  // GET
  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  // ADD
  const addBookMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      toast.success("Book added successfully!");
    },
    onError: () => {
      toast.error("Failed to add book");
    },
  });

  // UPDATE
  const updateBookMutation = useMutation({
    mutationFn: ({ id, book }) => updateBook(id, book),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      toast.success("Book updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update book");
    },
  });

  // DELETE
  const deleteBookMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      toast.success("Book deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete book");
    },
  });

  return {
    booksQuery,
    addBookMutation,
    updateBookMutation,
    deleteBookMutation,
  };
};
