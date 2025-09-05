import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="livros" options={{ title: 'Livros' }} />
      <Stack.Screen name="capitulos" options={{ title: 'Capítulos' }} />
      <Stack.Screen name="artigos" options={{ title: 'Artigos' }} />
      <Stack.Screen name="titulos" options={{ title: 'Títulos' }} />
      <Stack.Screen name="anotacoes" options={{ title: 'Anotações' }} />
      <Stack.Screen name="favoritos" options={{ title: 'Favoritos' }} />
      <Stack.Screen name="placeholder" options={{ title: 'Placeholder' }} />
    </Stack>
  );
}