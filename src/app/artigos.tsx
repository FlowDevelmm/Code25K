
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
  const { livroIndex, tituloIndex, capituloIndex, secaoIndex, subsecaoIndex } = useLocalSearchParams<{ livroIndex: string; tituloIndex: string; capituloIndex: string; secaoIndex?: string; subsecaoIndex?: string }>();
  const livro = codigoCivil[parseInt(livroIndex)];
  const titulo = livro?.titulos[parseInt(tituloIndex)];
  const capitulo = titulo?.capitulos[parseInt(capituloIndex)];
  
  let items = [];
  let screenTitle = capitulo?.nome || 'Artigos';

  if (secaoIndex !== undefined) {
    const secao = capitulo?.secoes[parseInt(secaoIndex)];
    screenTitle = secao?.nome || screenTitle;
    if (subsecaoIndex !== undefined) {
      const subsecao = secao?.subsecoes[parseInt(subsecaoIndex)];
      items = subsecao?.artigos || [];
      screenTitle = subsecao?.nome || screenTitle;
    } else {
      items = secao?.artigos || [];
    }
  } else {
    items = capitulo?.artigos || [];
  }

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

  if (!items) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Nenhum artigo encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: screenTitle, headerStyle: { backgroundColor: colors.card }, headerTintColor: colors.text }} />
      <FlatList
        data={items}
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
