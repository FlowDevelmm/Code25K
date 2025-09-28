import { ThemeProvider } from '../ThemeContext';
import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'SF-Pro-Display-Black-Italic': require('../../assets/fonts/sfprodisplayblackitalic.otf'),
    'SF-Pro-Display-Bold': require('../../assets/fonts/sfprodisplaybold.otf'),
    'SF-Pro-Display-Heavy-Italic': require('../../assets/fonts/sfprodisplayheavyitalic.otf'),
    'SF-Pro-Display-Light-Italic': require('../../assets/fonts/sfprodisplaylightitalic.otf'),
    'SF-Pro-Display-Medium': require('../../assets/fonts/sfprodisplaymedium.otf'),
    'SF-Pro-Display-Regular': require('../../assets/fonts/sfprodisplayregular.otf'),
    'SF-Pro-Display-Semibold-Italic': require('../../assets/fonts/sfprodisplaysemibolditalic.otf'),
    'SF-Pro-Display-Thin-Italic': require('../../assets/fonts/sfprodisplaythinitalic.otf'),
    'SF-Pro-Display-Ultralight-Italic': require('../../assets/fonts/sfprodisplayultralightitalic.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="article" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}