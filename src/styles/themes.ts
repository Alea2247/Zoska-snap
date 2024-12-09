// src/styles/themes.ts

import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#E43667',
    },
    background: {
      default: '#f4f6f8',
    },
    text: {
        primary: '#000000',
    },
}});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E60A48',
    },
    background: {
      default: '#121212',
    },
    text: {
        primary: '#ffffff',
    },
}});

export { lightTheme, darkTheme };