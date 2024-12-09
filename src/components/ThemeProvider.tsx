"use client";

// ThemeProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "light",
});

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? '#7b1fa2' : '#b39ddb', // Muted violet colors
      },
      background:
        {default: mode === "light" ? '#ffffff' : '#303030', // Lighter background in dark mode
        paper: mode === "light" ? '#ffffff' : '#424242', // Lighter paper background in dark mode}   
        },
    },
    components: {
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              color: mode === "light" ? '#7b1fa2' : '#b39ddb', // Muted violet colors
            },
            '&:hover': {
              color: mode === "light" ? '#7b1fa2' : '#b39ddb', // Muted violet colors
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            ...(mode === 'light' && {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Black box shadow in light mode
            }),
            ...(mode === 'dark' && {
              boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)', // White box shadow in dark mode
            }),
          },
        },
      },
    },
  });

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProvider;