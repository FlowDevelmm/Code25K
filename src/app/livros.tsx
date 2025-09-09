
import React from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useTheme } from '../ThemeContext';
import { codigoCivil } from '../data';
import { MaterialIcons } from '@expo/vector-icons';

export default function LivrosScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Livros' }} />
      <FlatList
        data={codigoCivil}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Link href={{ pathname: '/titulos', params: { livroIndex: index } }} asChild>
            <TouchableOpacity style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.nome}</Text>
              <MaterialIcons name="chevron-right" size={24} color={colors.text} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
  },
  itemText: {
    fontSize: 18,
    color: colors.text,
    fontFamily: 'Inter-Regular',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 16,
  },
});
