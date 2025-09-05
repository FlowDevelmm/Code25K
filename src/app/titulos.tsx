
import React from "react";
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Link, useLocalSearchParams, Stack } from "expo-router";
import { codigoCivil } from "../data";

export default function TitulosScreen() {
  const { livroIndex } = useLocalSearchParams<{ livroIndex: string }>();
  const livro = codigoCivil[parseInt(livroIndex)];

  if (!livro) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Livro não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: livro.nome }} />
      <FlatList
        data={livro.titulos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index: tituloIndex }) => (
          <Link href={{ pathname: "/capitulos", params: { livroIndex, tituloIndex } }} asChild>
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
