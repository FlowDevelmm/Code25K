import React, { useState, useEffect, useMemo } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Appbar, Searchbar, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
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
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = searchableData.filter(
      (item) =>
        (item.nome && item.nome.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.texto && item.texto.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    setSearchResults(results);
  }, [searchQuery, searchableData]);

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: normalize(16),
      paddingVertical: normalize(12),
    },
    title: { fontFamily: 'SF-Pro-Display-Bold', fontSize: normalize(22), lineHeight: normalize(22) * 1.5, color: colors.text, textAlign: 'center' },
    searchbar: { marginHorizontal: normalize(10), marginVertical: normalize(10), backgroundColor: colors.card },
    resultItem: {
        paddingVertical: normalize(15),
        paddingHorizontal: normalize(20),
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    resultTitle: {
        fontFamily: 'SF-Pro-Display-Bold',
        fontSize: normalize(18),
        lineHeight: normalize(18) * 1.5,
        color: colors.text
    },
    resultPath: {
        fontFamily: 'SF-Pro-Display-Regular',
        fontSize: normalize(16),
        lineHeight: normalize(16) * 1.5,
        color: colors.text,
        opacity: 0.7,
        marginTop: normalize(4)
    },
  });

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Pesquisa" titleStyle={styles.title} />
      </Appbar.Header>
      <Searchbar
        placeholder="Pesquisar artigos..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        autoFocus
      />
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
    </View>
  );
}