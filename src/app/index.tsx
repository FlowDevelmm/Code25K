import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, FlatList } from "react-native";
import { Link, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useTheme } from '../ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { codigoCivil, Artigo } from '../data';
import app from '../../app.json';

SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => size * scale;

interface SearchResult extends Artigo {
  path: string;
  livroIndex: number;
  tituloIndex: number;
  capituloIndex: number;
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: normalize(20),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(60),
    paddingBottom: normalize(20),
  },
  headerText: {
    fontSize: normalize(34),
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'Inter-Bold',
  },
  themeToggleButton: {
    padding: normalize(5),
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(40),
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
    fontSize: normalize(17),
    color: colors.text,
    fontFamily: 'Inter-Regular',
  },
  partsContainer: {
    flex: 1,
  },
  partRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: normalize(20),
  },
  partBox: {
    width: "48%",
    height: normalize(120),
    borderRadius: 15,
    padding: normalize(15),
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: colors.card,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  partIcon: {
    marginBottom: normalize(10),
  },
  partTitle: {
    fontSize: normalize(17),
    fontWeight: "600",
    color: colors.text,
    fontFamily: 'Inter-SemiBold',
  },
  carouselContainer: {
    marginBottom: normalize(20),
  },
  carouselTitle: {
    fontSize: normalize(22),
    fontWeight: "bold",
    color: colors.text,
    marginBottom: normalize(10),
    fontFamily: 'Inter-Bold',
  },
  carouselItem: {
    backgroundColor: colors.card,
    padding: normalize(20),
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    minHeight: normalize(100),
  },
  carouselText: {
    fontSize: normalize(17),
    color: colors.text,
    textAlign: "center",
    fontFamily: 'Inter-Regular',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: normalize(15),
  },
  dot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: colors.border,
    marginHorizontal: normalize(4),
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  footer: {
    paddingVertical: normalize(20),
    alignItems: "center",
  },
  footerText: {
    fontSize: normalize(12),
    color: colors.text,
    opacity: 0.6,
    fontFamily: 'Inter-Regular',
  },
  resultsContainer: {
    flex: 1,
  },
  resultItem: {
    paddingVertical: normalize(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultTitle: {
    fontSize: normalize(17),
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'Inter-SemiBold',
  },
  resultPath: {
    fontSize: normalize(13),
    color: colors.text,
    opacity: 0.6,
    marginTop: normalize(4),
    fontFamily: 'Inter-Regular',
  },
});

export default function MainScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(colors);

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require("../../assets/fonts/Inter_18pt-Regular.ttf"),
    'Inter-Bold': require("../../assets/fonts/Inter_18pt-Bold.ttf"),
    'Inter-SemiBold': require("../../assets/fonts/Inter_18pt-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const searchableData = useMemo(() => {
    const flatData: SearchResult[] = [];
    codigoCivil.forEach((livro, livroIndex) => {
      livro.titulos.forEach((titulo, tituloIndex) => {
        titulo.capitulos.forEach((capitulo, capituloIndex) => {
          const processArtigos = (artigos: Artigo[], path: string) => {
            artigos.forEach((artigo) => {
              flatData.push({ ...artigo, path, livroIndex, tituloIndex, capituloIndex });
            });
          };

          const basePath = `${livro.nome} > ${titulo.nome} > ${capitulo.nome}`;
          if (capitulo.artigos) {
            processArtigos(capitulo.artigos, basePath);
          }
          
          capitulo.secoes?.forEach((secao) => {
            const secaoPath = `${basePath} > ${secao.nome}`;
            if (secao.artigos) {
              processArtigos(secao.artigos, secaoPath);
            }

            secao.subsecoes?.forEach((subsecao) => {
              const subsecaoPath = `${secaoPath} > ${subsecao.nome}`;
              if (subsecao.artigos) {
                processArtigos(subsecao.artigos, subsecaoPath);
              }
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
        (item.nome && item.nome.toLowerCase().includes(search.toLowerCase())) ||
        (item.texto && item.texto.toLowerCase().includes(search.toLowerCase()))
    );
    setSearchResults(results);
  }, [search, searchableData]);

  const artigosDoDia = useMemo(() => {
    const allArtigos = searchableData.filter(artigo => artigo.texto && artigo.texto.length > 50);
    const shuffled = allArtigos.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }, [searchableData]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % artigosDoDia.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [artigosDoDia.length]);

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

    const currentArtigo = artigosDoDia[currentIndex];

    return (
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
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
            <TouchableOpacity style={styles.partBox}>
              <MaterialIcons name="info" size={normalize(30)} color={colors.primary} style={styles.partIcon} />
              <Text style={styles.partTitle}>Sobre</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.carouselContainer}>
          <Text style={styles.carouselTitle}>Artigo do Dia</Text>
          <TouchableOpacity 
            style={styles.carouselItem}
            onPress={() => router.push({ 
              pathname: '/artigos', 
              params: { 
                livroIndex: currentArtigo.livroIndex, 
                tituloIndex: currentArtigo.tituloIndex, 
                capituloIndex: currentArtigo.capituloIndex 
              }
            })}
          >
            <Text style={styles.carouselText}>{currentArtigo?.nome}</Text>
          </TouchableOpacity>
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
          <Text style={styles.footerText}>Versão {app.expo.version}</Text>
          <Text style={styles.footerText}>Desenvolvido pela Learn_Code</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.headerText, { color: colors.primary }]}>Código </Text>
            <Text style={styles.headerText}>Civil</Text>
          </View>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
            <MaterialIcons 
              name={isDarkMode ? 'wb-sunny' : 'brightness-3'} 
              size={normalize(24)} 
              color={colors.text} 
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
    </View>
  );
}
