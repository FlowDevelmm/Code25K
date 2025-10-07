import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '../ThemeContext';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFavoriteArticles } from '../hooks/useFavoriteArticles';

import { normalize } from '../utils/normalize';

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: normalize(20),
  },
  title: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: normalize(22),
    lineHeight: normalize(22) * 1.5,
    color: colors.text,
    marginBottom: normalize(10),
  },
  path: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: normalize(16),
    lineHeight: normalize(16) * 1.5,
    color: colors.text,
    opacity: 0.7,
    marginBottom: normalize(20),
    fontStyle: 'italic',
  },
  text: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: normalize(18),
    lineHeight: normalize(18) * 1.5,
    color: colors.text,
  },
});

const ArticleScreen = () => {
  const { colors } = useTheme();
  const { addFavoriteArticle, removeFavoriteArticle, isFavoriteArticle } = useFavoriteArticles();
  const styles = getStyles(colors);
  const { nome, texto, path } = useLocalSearchParams();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.title}>{nome}</Text>
          <TouchableOpacity
            onPress={() => {
              if (isFavoriteArticle(nome as string)) {
                removeFavoriteArticle(nome as string);
              } else {
                addFavoriteArticle(nome as string);
              }
            }}
          >
            <MaterialCommunityIcons
              name={isFavoriteArticle(nome as string) ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavoriteArticle(nome as string) ? colors.primary : colors.text}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.path}>{path}</Text>
        <Text style={styles.text}>{texto}</Text>
      </View>
    </ScrollView>
  );
};

export default ArticleScreen;
