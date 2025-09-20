import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue (default MUI primary) - you can customize
    },
    secondary: {
      main: "#9c27b0", // Purple
    },
    error: {
      main: "#d32f2f", // Red for errors/deletes
    },
    success: {
      main: "#2e7d32", // Green for success
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    // Example: customize MUI button
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
