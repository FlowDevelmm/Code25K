
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';
import { codigoCivil } from '../data';
import { AntDesign } from '@expo/vector-icons';

export default function ArtigosScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
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

  if (!capitulo) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Capítulo não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: capitulo.nome }} />
      <FlatList
        data={capitulo.artigos || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.artigoNome}>{item.nome}</Text>
              <TouchableOpacity onPress={() => toggleFavorite(item.nome)}>
                <AntDesign
                  name={favoritedArticles.includes(item.nome) ? 'star' : 'staro'}
                  size={24}
                  color={favoritedArticles.includes(item.nome) ? colors.primary : colors.text}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.artigoTexto}>{item.texto || '(sem texto)'}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: colors.card,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  artigoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  artigoTexto: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: colors.text,
  },
});
