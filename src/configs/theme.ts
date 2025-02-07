import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#DD7094", // Blue for light mode
    },
    secondary: {
      main: "#C76787",
    },
    background: {
      default: "#F4D2DB",
      paper: "#fdf0f0",
    },
    text: {
      primary: "#000000",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#DD7094", // Red for dark mode
    },
    secondary: {
      main: "#C76787",
    },
    background: {
      default: "#272727",
      paper: "#553A43",
    },
    text: {
      primary: "#FDF0F0",
      secondary: "#F4D2DB",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
});