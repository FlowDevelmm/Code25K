import { ThemeProvider } from '../ThemeContext';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Impede que a tela de splash desapareça automaticamente
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
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

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Esconde a tela de splash quando as fontes estiverem carregadas ou se houver um erro
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    // Retorna nulo apenas enquanto as fontes estão carregando e não há erro
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