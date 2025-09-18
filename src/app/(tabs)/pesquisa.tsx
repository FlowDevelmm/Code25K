import React, { useState, useEffect, useMemo } from 'react';
import { View, FlatList, StyleSheet, Pressable, Modal } from 'react-native';
import { Searchbar, Text, Button } from 'react-native-paper';
import { useRouter, Stack } from 'expo-router';
import { useTheme } from '../../ThemeContext';
import { codigoCivil, Artigo } from '../../data';
import { normalize } from '../../utils/normalize';

interface SearchResult extends Artigo {
  path: string;
}

const processArtigos = (artigos: Artigo[], path: string, flatData: SearchResult[]) => {
  artigos?.forEach((artigo) => {
    flatData.push({ ...artigo, path });
  });
};

export default function PesquisaScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedLivro, setSelectedLivro] = useState<string | null>(null);
  const [selectedTitulo, setSelectedTitulo] = useState<string | null>(null);
  const [selectedCapitulo, setSelectedCapitulo] = useState<string | null>(null);
  const [isLivroPickerVisible, setLivroPickerVisible] = useState(false);
  const [isTituloPickerVisible, setTituloPickerVisible] = useState(false);
  const [isCapituloPickerVisible, setCapituloPickerVisible] = useState(false);

  const searchableData = useMemo(() => {
    const flatData: SearchResult[] = [];
    codigoCivil.forEach((livro) => {
      livro.titulos.forEach((titulo) => {
        titulo.capitulos.forEach((capitulo) => {
          const basePath = `${livro.nome} > ${titulo.nome} > ${capitulo.nome}`;
          processArtigos(capitulo.artigos, basePath, flatData);

          capitulo.secoes?.forEach((secao) => {
            const secaoPath = `${basePath} > ${secao.nome}`;
            processArtigos(secao.artigos, secaoPath, flatData);

            secao.subsecoes?.forEach((subsecao) => {
              const subsecaoPath = `${secaoPath} > ${subsecao.nome}`;
              processArtigos(subsecao.artigos, subsecaoPath, flatData);
            });
          });
        });
      });
    });
    return flatData;
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '' && !selectedLivro && !selectedTitulo && !selectedCapitulo) {
      setSearchResults([]);
      return;
    }

    let results = searchableData;

    if (selectedLivro) {
      results = results.filter((item) => item.path.startsWith(selectedLivro));
    }

    if (selectedTitulo) {
      results = results.filter((item) => item.path.includes(`> ${selectedTitulo} >`));
    }

    if (selectedCapitulo) {
      results = results.filter((item) => item.path.includes(`> ${selectedCapitulo}`));
    }

    if (searchQuery.trim() !== '') {
      results = results.filter(
        (item) =>
          (item.nome && item.nome.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.texto && item.texto.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setSearchResults(results);
  }, [searchQuery, searchableData, selectedLivro, selectedTitulo, selectedCapitulo]);

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    searchbar: { marginHorizontal: normalize(10), marginVertical: normalize(10), backgroundColor: 'white' },
    filtersContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    filterButton: {
      borderRadius: 20,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'white',
    },
    filterButtonText: {
      color: colors.text,
      fontSize: normalize(12),
    },
    resultItem: {
        paddingVertical: normalize(15),
        paddingHorizontal: normalize(20),
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    resultTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
        color: colors.text
    },
    resultPath: {
        fontSize: normalize(12),
        color: colors.text,
        opacity: 0.7,
        marginTop: normalize(4)
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      maxHeight: '80%',
    },
    modalItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Pesquisa',
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Searchbar
        placeholder="Pesquisar artigos..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        autoFocus
      />
      <View style={styles.filtersContainer}>
        <Button
          icon="book-open-page-variant"
          mode="contained"
          onPress={() => setLivroPickerVisible(true)}
          style={styles.filterButton}
          labelStyle={styles.filterButtonText}
        >
          {selectedLivro || 'Livro'}
        </Button>
        <Button
          icon="format-title"
          mode="contained"
          onPress={() => setTituloPickerVisible(true)}
          style={styles.filterButton}
          labelStyle={styles.filterButtonText}
        >
          {selectedTitulo || 'Título'}
        </Button>
        <Button
          icon="format-list-bulleted"
          mode="contained"
          onPress={() => setCapituloPickerVisible(true)}
          style={styles.filterButton}
          labelStyle={styles.filterButtonText}
        >
          {selectedCapitulo || 'Capítulo'}
        </Button>
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <Pressable
            style={styles.resultItem}
            onPress={() => router.push({ pathname: '/article', params: { nome: item.nome, texto: item.texto, path: item.path } })}
          >
            <Text style={styles.resultTitle}>{item.nome}</Text>
            <Text style={styles.resultPath}>{item.path}</Text>
          </Pressable>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLivroPickerVisible}
        onRequestClose={() => {
          setLivroPickerVisible(!isLivroPickerVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={codigoCivil}
              keyExtractor={(item) => item.nome}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedLivro(item.nome);
                    setSelectedTitulo(null);
                    setSelectedCapitulo(null);
                    setLivroPickerVisible(false);
                  }}
                >
                  <Text>{item.nome}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isTituloPickerVisible}
        onRequestClose={() => {
          setTituloPickerVisible(!isTituloPickerVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={codigoCivil.find((livro) => livro.nome === selectedLivro)?.titulos || []}
              keyExtractor={(item) => item.nome}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedTitulo(item.nome);
                    setSelectedCapitulo(null);
                    setTituloPickerVisible(false);
                  }}
                >
                  <Text>{item.nome}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCapituloPickerVisible}
        onRequestClose={() => {
          setCapituloPickerVisible(!isCapituloPickerVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={codigoCivil.find((livro) => livro.nome === selectedLivro)?.titulos.find((titulo) => titulo.nome === selectedTitulo)?.capitulos || []}
              keyExtractor={(item) => item.nome}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCapitulo(item.nome);
                    setCapituloPickerVisible(false);
                  }}
                >
                  <Text>{item.nome}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
