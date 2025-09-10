import { Stack } from 'expo-router';
import React from 'react';
import { ThemeProvider } from '../ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="livros" options={{ title: 'Livros' }} />
        <Stack.Screen name="titulos" options={{ title: 'Títulos' }} />
        <Stack.Screen name="capitulos" options={{ title: 'Capítulos' }} />
        <Stack.Screen name="secoes" options={{ title: 'Seções' }} />
        <Stack.Screen name="subsecoes" options={{ title: 'Subseções' }} />
        <Stack.Screen name="artigos" options={{ title: 'Artigos' }} />
        <Stack.Screen name="anotacoes" options={{ title: 'Anotações' }} />
        <Stack.Screen name="favoritos" options={{ title: 'Favoritos' }} />
        <Stack.Screen name="article" options={{ title: 'Artigo' }} />
      </Stack>
    </ThemeProvider>
  );
}