import React, { createContext, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';

const lightColors = {
  background: '#fff',
  text: '#000',
  primary: '#00bfff',
  card: '#f2f2f2',
  border: '#00bfff',
};

const darkColors = {
  background: '#000',
  text: '#fff',
  primary: '#00bfff',
  card: '#333',
  border: '#00bfff',
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
