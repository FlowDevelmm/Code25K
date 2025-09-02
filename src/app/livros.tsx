
import React from "react";
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { codigoCivil } from "./data";

export default function LivrosScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={codigoCivil}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Link href={{ pathname: "/titulos", params: { livroIndex: index } }} asChild>
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
