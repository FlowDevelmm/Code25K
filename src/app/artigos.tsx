
import React from "react";
import { SafeAreaView, Text, View, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { codigoCivil } from "./data";

export default function ArtigosScreen() {
  const { livroIndex, tituloIndex, capituloIndex } = useLocalSearchParams<{ livroIndex: string; tituloIndex: string; capituloIndex: string }>();
  const livro = codigoCivil[parseInt(livroIndex)];
  const titulo = livro?.titulos[parseInt(tituloIndex)];
  const capitulo = titulo?.capitulos[parseInt(capituloIndex)];

  if (!capitulo) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Capítulo não encontrado.</Text>
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
            <Text style={styles.artigoNome}>{item.nome}</Text>
            <Text style={styles.artigoTexto}>{item.texto || "(sem texto)"}</Text>
          </View>
        )}
        ListHeaderComponent={() => <Text style={styles.header}>{capitulo.nome}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  artigoNome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  artigoTexto: {
    fontSize: 16,
    lineHeight: 24,
  },
});
