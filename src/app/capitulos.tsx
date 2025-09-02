
import React from "react";
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Link, useLocalSearchParams, Stack } from "expo-router";
import { codigoCivil } from "./data";

export default function CapitulosScreen() {
  const { livroIndex, tituloIndex } = useLocalSearchParams<{ livroIndex: string; tituloIndex: string }>();
  const livro = codigoCivil[parseInt(livroIndex)];
  const titulo = livro?.titulos[parseInt(tituloIndex)];

  if (!titulo) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Título não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: titulo.nome }} />
      <FlatList
        data={titulo.capitulos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index: capituloIndex }) => (
          <Link href={{ pathname: "/artigos", params: { livroIndex, tituloIndex, capituloIndex } }} asChild>
            <TouchableOpacity>
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.nome}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemText: {
    fontSize: 18,
  },
});
