import { ThemeProvider } from '../ThemeContext';
import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="article" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}