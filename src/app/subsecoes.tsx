import React from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useLocalSearchParams, Stack } from 'expo-router';
import { useTheme } from '../ThemeContext';
import { codigoCivil } from '../data';
import { MaterialIcons } from '@expo/vector-icons';

export default function SubsecoesScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { livroIndex, tituloIndex, capituloIndex, secaoIndex } = useLocalSearchParams<{ livroIndex: string; tituloIndex: string; capituloIndex: string; secaoIndex: string }>();
  const livro = codigoCivil[parseInt(livroIndex)];
  const titulo = livro?.titulos[parseInt(tituloIndex)];
  const capitulo = titulo?.capitulos[parseInt(capituloIndex)];
  const secao = capitulo?.secoes[parseInt(secaoIndex)];

  if (!secao) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Seção não encontrada.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: secao.nome, headerStyle: { backgroundColor: colors.card }, headerTintColor: colors.text }} />
      <FlatList
        data={secao.subsecoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index: subsecaoIndex }) => (
          <Link href={{ pathname: '/artigos', params: { livroIndex, tituloIndex, capituloIndex, secaoIndex, subsecaoIndex } }} asChild>
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
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: colors.text,
  },
});