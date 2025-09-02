import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Código Civil Moçambique</Text>

      <Link href="/livros" style={styles.link}>
        📚 Ver Livros
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1E3A8A",
  },
  link: {
    fontSize: 18,
    color: "#1E3A8A",
    padding: 12,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    borderRadius: 8,
  },
});
