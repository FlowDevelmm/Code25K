import React, { createContext, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';

const lightColors = {
  background: '#ffffff',
  text: '#0b1630',
  textSecondary: '#4a5668',
  primary: '#0a5da1',
  card: '#f2f2f2',
  border: '#d8e9f8',
  icon: '#0a5da1',
  danger: '#ff4d4d',
};

const darkColors = {
  background: '#0b1220',
  text: '#e6eef6',
  textSecondary: '#a9b7c9',
  primary: '#3fa0ff',
  card: '#121b2a',
  border: '#4cc4ff',
  icon: '#3fa0ff',
  danger: '#ff4d4d',
};

const ThemeContext = createContext({
  isDarkMode: false,
  colors: lightColors,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
