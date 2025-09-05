import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

// ------------------ Splash Screen ------------------
function SplashScreenComponent({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashText}>Código Civil Digital</Text>
    </View>
  );
}

// ------------------ Main Screen ------------------
function MainScreen() {
  const [search, setSearch] = useState("");

  const artigosDoDia = [
    "Todos são iguais perante a lei.",
    "Direito à propriedade.",
    "Liberdade de expressão.",
    "Direito à educação."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % artigosDoDia.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Texto destacado */}
      <View style={styles.headerTextWrapper}>
        <Text style={{ color: "#00bfff", fontWeight: "bold", fontSize: 28, fontFamily: 'Inter-Bold' }}>Código </Text>
        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 28, fontFamily: 'Inter-Bold' }}>Civil</Text>
      </View>

      {/* Imagem abaixo do texto */}
      <View style={styles.imageWrapper}>
        <Image source={require("../../assets/images/CCC.jpg")} style={styles.topImage} />
      </View>

      {/* Barra de pesquisa */}
      <TextInput style={styles.searchBar} placeholder="Pesquisar..." value={search} onChangeText={setSearch} />

      {/* Quadrados principais */}
      <View style={styles.partsContainer}>
        <View style={styles.partRow}>
          <Link href="/livros" asChild>
            <TouchableOpacity style={styles.partBoxWhite}>
              <Text style={styles.partTitle}>Código Civil</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/anotacoes" asChild>
            <TouchableOpacity style={styles.partBoxWhite}>
              <Text style={styles.partTitle}>Anotações</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.partRow}>
          <Link href="/favoritos" asChild>
            <TouchableOpacity style={styles.partBoxWhite}>
              <Text style={styles.partTitle}>Favoritos</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/placeholder" asChild>
            <TouchableOpacity style={styles.partBoxWhite}>
              <Text style={styles.partTitle}>+</Text>
            </TouchableOpacity>
          </Link>
          
        </View>
      </View>

      {/* Carrossel automático */}
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitle}>Artigo do Dia</Text>
        <View style={styles.carouselItem}>
          <Text style={styles.carouselText}>{artigosDoDia[currentIndex]}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Código Civil Digital</Text>
        <Text style={[styles.footerText, { color: "red" }]}>Desenvolvido em Moçambique</Text>
      </View>
    </View>
  );
}

// ------------------ App Principal ------------------
export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require("../../assets/fonts/Inter_18pt-Regular.ttf"),
    'Inter-Bold': require("../../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <MainScreen />;
}

// ------------------ Estilos ------------------
const styles = StyleSheet.create({
  // Splash
  splashContainer: { flex: 1, backgroundColor: "#00bfff", alignItems: "center", justifyContent: "center" },
  splashText: { fontSize: 26, fontWeight: "bold", color: "#fff", fontFamily: 'Inter-Bold' },

  // Tela principal
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  headerTextWrapper: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 15 },
  imageWrapper: { width: "100%", alignItems: "center", marginBottom: 20 },
  topImage: { width: "100%", height: 120, resizeMode: "contain" },
  searchBar: { height: 50, borderColor: "#00bfff", borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 20, backgroundColor: "#f2f2f2", fontSize: 16 },

  // Quadrados
  partsContainer: { flex: 1, marginTop: 10 },
  partRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  partBoxWhite: { width: "48%", borderRadius: 10, paddingVertical: 50, alignItems: "center", justifyContent: "center", elevation: 4, backgroundColor: "#f2f2f2", borderWidth: 1, borderColor: "#00bfff" },
  partTitle: { fontSize: 18, fontWeight: "bold", color: "#000", textAlign: "center", fontFamily: 'Inter-Bold' },

  // Carrossel
  carouselContainer: { marginBottom: 10 },
  carouselTitle: { fontSize: 18, fontWeight: "bold", color: "#00bfff", marginBottom: 5, textAlign: "center", fontFamily: 'Inter-Bold' },
  carouselItem: { backgroundColor: "#f2f2f2", padding: 20, borderRadius: 10, justifyContent: "center", alignItems: "center", minHeight: 70, borderWidth: 1, borderColor: "#00bfff" },
  carouselText: { fontSize: 16, color: "#000", textAlign: "center", fontFamily: 'Inter-Regular' },

  // Footer
  footer: { paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#00bfff", alignItems: "center", marginTop: 10 },
  footerText: { fontSize: 12, color: "#000", fontFamily: 'Inter-Regular' },

  
});
