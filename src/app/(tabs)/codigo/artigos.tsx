import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useLocalSearchParams, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../../ThemeContext';
import { codigoCivil, Artigo } from '../../../data';
import { useFavoriteArticles } from '../../../hooks/useFavoriteArticles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { normalize } from '../../../utils/normalize';

const getArtigosData = (
  livroIndex: string,
  tituloIndex: string,
  capituloIndex: string,
  secaoIndex?: string,
  subsecaoIndex?: string
) => {
  const livro = codigoCivil[parseInt(livroIndex)];
  const titulo = livro?.titulos[parseInt(tituloIndex)];
  const capitulo = titulo?.capitulos[parseInt(capituloIndex)];

  let items: Artigo[] = [];
  let screenTitle = capitulo?.nome || 'Artigos';

  if (secaoIndex !== undefined) {
    const secao = capitulo?.secoes?.[parseInt(secaoIndex)];
    screenTitle = secao?.nome || screenTitle;
    if (subsecaoIndex !== undefined) {
      const subsecao = secao?.subsecoes?.[parseInt(subsecaoIndex)];
      items = subsecao?.artigos || [];
      screenTitle = subsecao?.nome || screenTitle;
    } else {
      items = secao?.artigos || [];
    }
  } else {
    items = capitulo?.artigos || [];
  }

  return { items, screenTitle };
};

export default function ArtigosScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const params = useLocalSearchParams<{ livroIndex: string; tituloIndex: string; capituloIndex: string; secaoIndex?: string; subsecaoIndex?: string }>();
  
  const { items, screenTitle } = getArtigosData(
    params.livroIndex,
    params.tituloIndex,
    params.capituloIndex,
    params.secaoIndex,
    params.subsecaoIndex
  );

  const { favoriteArticles, addFavoriteArticle, removeFavoriteArticle, isFavoriteArticle } = useFavoriteArticles();

  if (!items || items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Stack.Screen options={{ title: 'Código', headerStyle: { backgroundColor: colors.card }, headerTintColor: colors.text, headerTitleStyle: { fontSize: normalize(18) } }} />
          <Text style={styles.errorText}>Nenhum artigo encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
               <Stack.Screen options={{ title: 'Código', headerStyle: { backgroundColor: colors.card }, headerTintColor: colors.text }} />
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/article', params: { nome: item.nome, texto: item.texto, path: screenTitle } }} asChild>
            <TouchableOpacity style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.artigoNome}>{item.nome}</Text>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (isFavoriteArticle(item.nome)) {
                      removeFavoriteArticle(item.nome);
                    } else {
                      addFavoriteArticle(item.nome);
                    }
                  }}
                >
                  <MaterialCommunityIcons
                    name={isFavoriteArticle(item.nome) ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isFavoriteArticle(item.nome) ? colors.primary : colors.text}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Link>
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
    padding: normalize(16),
    backgroundColor: colors.card,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  artigoNome: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: normalize(18),
    lineHeight: normalize(18) * 1.5,
    color: colors.text,
    flex: 1,
  },
  
  separator: {
    height: normalize(1),
    backgroundColor: colors.border,
  },
  errorText: {
    textAlign: 'center',
    marginTop: normalize(20),
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: normalize(18),
    lineHeight: normalize(18) * 1.5,
    color: colors.text,
  },
});