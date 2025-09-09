import React, { createContext, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';

const lightColors = {
  background: '#f0f0f7',
  text: '#000',
  primary: '#007aff',
  card: '#fff',
  border: '#dcdcdc',
  icon: '#007aff',
};

const darkColors = {
  background: '#000',
  text: '#fff',
  primary: '#0a84ff',
  card: '#1c1c1e',
  border: '#38383a',
  icon: '#0a84ff',
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
