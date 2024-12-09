// src\providers\ThemeProvider.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "../styles/themes";

const ThemeContext = createContext({
    toggleTheme: () => {}, 
    themeMode: 'light', 
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  
    // Počiatočné nastavenie témy na základe uložených preferencií v localStorage
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setThemeMode(savedTheme as 'light' | 'dark');
      }
    }, []);
  
    // Uloženie zvolenej témy do localStorage, aby sa zachovala po obnovení stránky
    useEffect(() => {
      localStorage.setItem('theme', themeMode);
    }, [themeMode]);
  
    // Funkcia na prepínanie témy
    const toggleTheme = () => {
      setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };
  
    // Výber správnej témy (svetlý alebo tmavý režim)
    const theme = themeMode === 'light' ? lightTheme : darkTheme;
  
    return (
      <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />  {/* Automaticky nastaví globálne štýly podľa témy */}
          {children}
        </MUIThemeProvider>
      </ThemeContext.Provider>
    );
  };
  
  export const useThemeContext = () => useContext(ThemeContext);