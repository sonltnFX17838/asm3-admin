import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          display: "flex",
          gap: "12px",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: "none",
        },
      },
    },
  },
});

export default theme;
