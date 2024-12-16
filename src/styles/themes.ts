// src/styles/themes.ts

import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#176B87',
    },
    background: {
      default: '#DAFFFB',
    },
    text: {
        primary: '#001C30',
    },
}});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#176B87',
    },
    background: {
      default: '#001C30',
    },
    text: {
        primary: '#DAFFFB',
    },
}});

export { lightTheme, darkTheme };