import React from "react";
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useLocalSearchParams, Stack } from "expo-router";
import { useTheme } from '../../../ThemeContext';
import { codigoCivil } from '../../../data';
import { MaterialIcons } from '@expo/vector-icons';

export default function TitulosScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { livroIndex } = useLocalSearchParams<{ livroIndex: string }>();
  const livro = codigoCivil[parseInt(livroIndex)];

  if (!livro) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.itemText}>Livro não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Títulos", headerStyle: { backgroundColor: colors.card }, headerTintColor: colors.text }} />
      <FlatList
        data={livro.titulos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index: tituloIndex }) => (
          <Link href={{ pathname: "/codigo/capitulos", params: { livroIndex, tituloIndex } }} asChild>
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
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 18,
    lineHeight: 18 * 1.5,
    color: colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 16,
  },
});