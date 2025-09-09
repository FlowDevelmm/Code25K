import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, FlatList, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, Stack } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { codigoCivil } from "../data";

export default function ArtigosScreen() {
  const { livroIndex, tituloIndex, capituloIndex } = useLocalSearchParams<{ livroIndex: string; tituloIndex: string; capituloIndex: string }>();
  const livro = codigoCivil[parseInt(livroIndex)];
  const titulo = livro?.titulos[parseInt(tituloIndex)];
  const capitulo = titulo?.capitulos[parseInt(capituloIndex)];

  const [favoritedArticles, setFavoritedArticles] = useState<string[]>([]);

  useEffect(() => {
    loadFavoritedArticles();
  }, []);

  const loadFavoritedArticles = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoritedArticles');
      if (storedFavorites !== null) {
        setFavoritedArticles(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorited articles.', error);
    }
  };

  const [theme, setTheme] = useState('light');
  const [pagina] = useState(1);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleFavorite = async (articleName: string) => {
    let newFavorites = [...favoritedArticles];
    if (newFavorites.includes(articleName)) {
      newFavorites = newFavorites.filter((name) => name !== articleName);
    } else {
      newFavorites.push(articleName);
    }
    setFavoritedArticles(newFavorites);
    try {
      await AsyncStorage.setItem('favoritedArticles', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Failed to save favorited articles.', error);
    }
  };

  const styles = getStyles(theme);

  if (!capitulo) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.artigoTexto}>Capítulo não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: capitulo.nome, headerShown: false }} />
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={theme === 'dark' ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={theme === 'dark'}
          />
          <TouchableOpacity>
            <Text style={styles.headerMenu}>...</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>{livro.nome}</Text>
          <Text style={styles.subHeaderText}>Página: {pagina}</Text>
        </View>
      </View>
      <FlatList
        data={capitulo.artigos || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.artigoNome}>{item.nome}</Text>
            <Text style={styles.artigoTexto}>{item.texto || "(sem texto)"}</Text>
            {/* Favorite button */}
            <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item.nome)}>
              <AntDesign
                name={favoritedArticles.includes(item.nome) ? "star" : "staro"}
                size={24}
                color={favoritedArticles.includes(item.nome) ? "gold" : "gray"}
              />
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={() => <Text style={styles.capituloHeader}>{capitulo.nome}</Text>}
      />
    </SafeAreaView>
  );
}

const getStyles = (theme) => {
  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === 'light' ? "#fff" : "#121212",
  },
  headerContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme === 'light' ? "#ddd" : "#333",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerMenu: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme === 'light' ? "#000" : "#fff",
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
    borderRadius: 0,
  },
  subHeaderText: {
    fontSize: 16,
    color: theme === 'light' ? "#000" : "#fff",
  },
  capituloHeader: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: theme === 'light' ? "#f0f0f0" : "#333",
    color: theme === 'light' ? "#000" : "#fff",
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: theme === 'light' ? "#ddd" : "#333",
  },
  artigoNome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme === 'light' ? "#000" : "#fff",
  },
  artigoTexto: {
    fontSize: 16,
    lineHeight: 24,
    color: theme === 'light' ? "#000" : "#fff",
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});
};