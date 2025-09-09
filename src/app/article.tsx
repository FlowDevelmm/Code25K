import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '../ThemeContext';

const normalize = (size) => size; // This should be replaced with the global normalize function if needed

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: normalize(20),
  },
  title: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: normalize(10),
  },
  path: {
    fontSize: normalize(14),
    color: colors.text,
    opacity: 0.7,
    marginBottom: normalize(20),
    fontStyle: 'italic',
  },
  text: {
    fontSize: normalize(18),
    color: colors.text,
    lineHeight: normalize(28),
  },
});

const ArticleScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { nome, texto, path } = useLocalSearchParams();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <Text style={styles.title}>{nome}</Text>
        <Text style={styles.path}>{path}</Text>
        <Text style={styles.text}>{texto}</Text>
      </View>
    </ScrollView>
  );
};

export default ArticleScreen;
