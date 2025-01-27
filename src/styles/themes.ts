// src/styles/themes.ts

import { createTheme } from '@mui/material/styles';

const baseTheme = {
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
};

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: { main: '#176B87' },
    secondary: { main: '#64CCC5' },
    background: {
      default: '#DAFFFB',
      paper: '#fff',
    },
    text: {
      primary: '#001C30',
      secondary: '#00000',
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#176B87', // Default icon color
          '&:hover': {
            color: '#64CCC5', // Hover color
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#64CCC5', // Hover background color for buttons
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#176B87', // Default link color
          '&:hover': {
            color: '#64CCC5', // Hover link color
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            borderColor: '#176B87', // Focus border color
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root.Mui-focused': {
            borderColor: '#176B87', // Focus color for text fields
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: { main: '#64CCC5' },
    secondary: { main: '#176B87' },
    background: {
      default: '#001C30',
      paper: '#121212',
    },
    text: {
      primary: '#DAFFFB',
      secondary: '#fff',
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#64CCC5', // Default icon color in dark mode
          '&:hover': {
            color: '#176B87', // Hover icon color in dark mode
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#176B87', // Hover background color for buttons
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#64CCC5', // Default link color in dark mode
          '&:hover': {
            color: '#176B87', // Hover link color in dark mode
          },
        },
      },
    },
  },
});

export { lightTheme, darkTheme };