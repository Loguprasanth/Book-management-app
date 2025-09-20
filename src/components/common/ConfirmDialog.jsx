import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, isLoading }) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
        },
      }}
    >
      <Box textAlign="center" mt={1}>
        {/* Red Circle Icon */}
        <Box
          sx={{
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: "#fee2e2", // Tailwind bg-red-100
            mb: 2,
          }}
        >
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            style={{
              color: "#dc2626", // Tailwind text-red-600
              fontSize: "20px", // Tailwind text-xl
            }}
          />
        </Box>

        {/* Title */}
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: 600,
            p: 0,
            mb: 1,
          }}
        >
          {title || "Delete Book"}
        </DialogTitle>

        {/* Message */}
        <DialogContent sx={{ p: 0, mb: 2 }}>
          <DialogContentText sx={{ fontSize: "0.9rem", color: "text.secondary" }}>
            {message || "Are you sure you want to delete this book? This action cannot be undone."}
          </DialogContentText>
        </DialogContent>

        {/* Buttons */}
        <DialogActions
          sx={{
            justifyContent: "center",
            gap: 2,
            p: 0,
          }}
        >
          <Button
            onClick={onCancel}
            variant="outlined"
            disabled={isLoading}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="error"
            disabled={isLoading}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              boxShadow: 1,
              "&:hover": {
                boxShadow: 3,
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;
