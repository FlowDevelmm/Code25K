import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, FlatList } from "react-native";
import { Link, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useTheme } from '../ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import MoreOptionsModal from '../components/MoreOptionsModal';
import { codigoCivil, Artigo } from '../data';

SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => size * scale;

interface SearchResult extends Artigo {
  path: string;
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: normalize(20),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(15),
    marginTop: normalize(40),
  },
  headerTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: normalize(28),
    fontFamily: 'Inter-Bold',
  },
  themeToggleButton: {
    padding: normalize(5),
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(50),
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: normalize(10),
    marginBottom: normalize(20),
    backgroundColor: colors.card,
  },
  searchIcon: {
    marginRight: normalize(10),
  },
  searchBar: {
    flex: 1,
    height: '100%',
    fontSize: normalize(16),
    color: colors.text,
  },
  partsContainer: {
    flex: 1,
    marginTop: normalize(30),
  },
  partRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: normalize(20),
  },
  partBox: {
    width: "48%",
    height: normalize(140),
    borderRadius: 10,
    paddingVertical: normalize(20),
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  partIcon: {
    marginBottom: normalize(10),
  },
  partTitle: {
    fontSize: normalize(16),
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    fontFamily: 'Inter-Bold',
  },
  carouselContainer: {
    marginBottom: normalize(10),
  },
  carouselTitle: {
    fontSize: normalize(18),
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: normalize(5),
    textAlign: "left",
    fontFamily: 'Inter-Bold',
  },
  carouselItem: {
    backgroundColor: colors.card,
    padding: normalize(20),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    minHeight: normalize(70),
    borderWidth: 1,
    borderColor: colors.border,
  },
  carouselText: {
    fontSize: normalize(16),
    color: colors.text,
    textAlign: "center",
    fontFamily: 'Inter-Regular',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: normalize(10),
  },
  dot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: '#ccc',
    marginHorizontal: normalize(4),
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  footer: {
    paddingVertical: normalize(10),
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: "center",
    marginTop: normalize(10),
  },
  footerText: {
    fontSize: normalize(12),
    color: colors.text,
    fontFamily: 'Inter-Regular',
  },
  resultsContainer: {
    flex: 1,
  },
  resultItem: {
    padding: normalize(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: colors.text,
  },
  resultPath: {
    fontSize: normalize(12),
    color: colors.text,
    opacity: 0.7,
  },
});

export default function MainScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(colors);
  const [isModalVisible, setModalVisible] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require("../../assets/fonts/Inter_18pt-Regular.ttf"),
    'Inter-Bold': require("../../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const searchableData = useMemo(() => {
    const flatData: SearchResult[] = [];
    codigoCivil.forEach((livro) => {
      livro.titulos.forEach((titulo) => {
        titulo.capitulos.forEach((capitulo) => {
          const processArtigos = (artigos: Artigo[], path: string) => {
            artigos.forEach((artigo) => {
              flatData.push({ ...artigo, path });
            });
          };

          const basePath = `${livro.nome} > ${titulo.nome} > ${capitulo.nome}`;
          processArtigos(capitulo.artigos, basePath);

          capitulo.secoes?.forEach((secao) => {
            const secaoPath = `${basePath} > ${secao.nome}`;
            processArtigos(secao.artigos, secaoPath);

            secao.subsecoes?.forEach((subsecao) => {
              const subsecaoPath = `${secaoPath} > ${subsecao.nome}`;
              processArtigos(subsecao.artigos, subsecaoPath);
            });
          });
        });
      });
    });
    return flatData;
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = searchableData.filter(
      (item) =>
        item.nome.toLowerCase().includes(search.toLowerCase()) ||
        item.texto.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  }, [search, searchableData]);

  const artigosDoDia = [
    "Todos são iguais perante a lei.",
    "Direito à propriedade.",
    "Liberdade de expressão.",
    "Direito à educação."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % artigosDoDia.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const renderContent = () => {
    if (search.trim() !== '') {
      return (
        <FlatList
          style={styles.resultsContainer}
          data={searchResults}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.resultItem}
              onPress={() => router.push({ pathname: '/article', params: { nome: item.nome, texto: item.texto, path: item.path } })}
            >
              <Text style={styles.resultTitle}>{item.nome}</Text>
              <Text style={styles.resultPath}>{item.path}</Text>
            </TouchableOpacity>
          )}
        />
      );
    }

    return (
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.partsContainer}>
          <View style={styles.partRow}>
            <Link href="/livros" asChild>
              <TouchableOpacity style={styles.partBox}>
                <MaterialIcons name="book" size={normalize(30)} color={colors.primary} style={styles.partIcon} />
                <Text style={styles.partTitle}>Código Civil</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/anotacoes" asChild>
              <TouchableOpacity style={styles.partBox}>
                <MaterialIcons name="edit" size={normalize(30)} color={colors.primary} style={styles.partIcon} />
                <Text style={styles.partTitle}>Anotações</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.partRow}>
            <Link href="/favoritos" asChild>
              <TouchableOpacity style={styles.partBox}>
                <MaterialIcons name="star" size={normalize(30)} color={colors.primary} style={styles.partIcon} />
                <Text style={styles.partTitle}>Favoritos</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.partBox} onPress={() => setModalVisible(true)}>
              <MaterialIcons name="add" size={normalize(30)} color={colors.primary} style={styles.partIcon} />
              <Text style={styles.partTitle}>Mais</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.carouselContainer}>
          <Text style={styles.carouselTitle}>Artigo do Dia</Text>
          <View style={styles.carouselItem}>
            <Text style={styles.carouselText}>{artigosDoDia[currentIndex]}</Text>
          </View>
          <View style={styles.dotsContainer}>
            {artigosDoDia.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentIndex ? styles.activeDot : {}]}
              />
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Versão 1.0.0</Text>
          <Text style={styles.footerText}>Desenvolvido pela Learn_Code</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTextWrapper}>
            <Text style={[styles.headerText, { color: colors.primary }]}>Código </Text>
            <Text style={[styles.headerText, { color: colors.text }]}>Civil</Text>
          </View>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
            <MaterialIcons 
              name={isDarkMode ? 'wb-sunny' : 'brightness-3'} 
              size={normalize(24)} 
              color={colors.primary} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBarContainer}>
          <MaterialIcons name="search" size={normalize(20)} color={colors.text} style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Pesquisar..."
            placeholderTextColor={colors.text}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {renderContent()}
      </View>
      <MoreOptionsModal 
        isVisible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
        onOptionPress={(option) => console.log("Selected:", option)}
      />
    </View>
  );
}
