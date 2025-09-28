import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions, TextInput, ImageBackground } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';
import PagerView from 'react-native-pager-view';
import { normalize } from '../../utils/normalize';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../ThemeContext';

// Lista de livros para pesquisa
const livros = [
  { id: '1', nome: 'Livro I – Das Pessoas' },
  { id: '2', nome: 'Livro II – Do Direito de Família' },
  { id: '3', nome: 'Livro III – Do Direito das Sucessões' },
];

// Artigos do dia
const artigosDoDia = [
  { id: '1', nome: 'Artigo 1: A personalidade jurídica', texto: 'A personalidade jurídica adquire-se no momento do nascimento completo e com vida.' },
  { id: '2', nome: 'Artigo 2: Direitos de personalidade', texto: 'A lei protege os indivíduos contra qualquer ofensa ilícita ou ameaça de ofensa à sua personalidade física ou moral.' },
  { id: '3', nome: 'Artigo 80: Responsabilidade civil', texto: 'Aquele que, com dolo ou mera culpa, violar ilicitamente o direito de outrem ou qualquer disposição legal destinada a proteger interesses alheios fica obrigado a indemnizar o lesado pelos danos resultantes da violação.' },
];

// Factos curiosos
const factosCuriosos = [
  { id: '1', titulo: 'Maioridade', descricao: 'A maioridade em Moçambique é atingida aos 21 anos.' },
  { id: '2', titulo: 'Casamento', descricao: 'O casamento é a união voluntária entre um homem e uma mulher, com o propósito de constituir família.' },
  { id: '3', titulo: 'Propriedade Horizontal', descricao: 'O Código Civil regula a propriedade de apartamentos e andares de um mesmo edifício.' },
  { id: '4', titulo: 'Testamento', descricao: 'Qualquer pessoa pode dispor dos seus bens para depois da morte, através de um testamento.' },
];

// Estilos
const getStyles = (width, height, colors) => StyleSheet.create({
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
  content: { padding: normalize(16), paddingBottom: normalize(90) },
  sectionTitle: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: normalize(20),
    lineHeight: normalize(20) * 1.5,
    color: colors.text,
    marginBottom: normalize(12),
  },
  pagerContainer: { height: height * 0.28, marginBottom: normalize(25) },
  pagerView: { flex: 1 },
  slide: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.card,
    padding: normalize(16),
    elevation: 0,
    shadowColor: 'transparent',
  },
  slideTitle: { fontFamily: 'SF-Pro-Display-Bold', fontSize: normalize(20), lineHeight: normalize(20) * 1.5, color: 'white', marginBottom: normalize(12) },
  slideText: { fontFamily: 'SF-Pro-Display-Regular', fontSize: normalize(16), lineHeight: normalize(16) * 1.5, color: 'white', opacity: 0.85, textAlign: 'justify' },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: normalize(12) },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border, marginHorizontal: 4 },
  activeDot: { backgroundColor: colors.primary },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  toggleText: { fontFamily: 'SF-Pro-Display-Regular', color: colors.text, marginLeft: 6 },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    marginHorizontal: normalize(16),
    marginVertical: normalize(10),
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    marginLeft: normalize(8),
    flex: 1,
    color: colors.text,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: normalize(16),
    lineHeight: normalize(16) * 1.5,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    padding: normalize(16),
  },
  });

export default function HomeScreen() {
  const { colors, toggleTheme } = useTheme();
  const router = useRouter();
  const [pagerIndex, setPagerIndex] = useState(0);
  const [factoIndex, setFactoIndex] = useState(0);
  const [searchText, setSearchText] = useState('');

  const pagerRef = useRef<PagerView>(null);
  const factoPagerRef = useRef<PagerView>(null);

  const { width, height } = useWindowDimensions();
  const styles = getStyles(width, height, colors);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const articleIndex = dayOfYear % artigosDoDia.length;
    setPagerIndex(articleIndex);
    pagerRef.current?.setPage(articleIndex);

    const factoIndex = dayOfYear % factosCuriosos.length;
    setFactoIndex(factoIndex);
    factoPagerRef.current?.setPage(factoIndex);
  }, []);

  const filteredLivros = livros.filter(l => l.nome.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Código Civil" titleStyle={styles.title} />
      </Appbar.Header>

      {/* Barra de pesquisa */}
      <View style={styles.searchBarContainer}>
        <MaterialCommunityIcons name="book-outline" size={20} color={colors.text} />
        <TextInput
          placeholder="Pesquisar livros..."
          placeholderTextColor={colors.textSecondary}
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Resultados da pesquisa */}
        {searchText.length > 0 && (
          <View style={{ marginBottom: normalize(20) }}>
            {filteredLivros.map(livro => (
              <TouchableOpacity key={livro.id} onPress={() => router.push({ pathname: '/livro', params: { nome: livro.nome } })}>
                <Card style={[styles.slide, { marginBottom: normalize(10), paddingVertical: normalize(12) }]} elevation={0}>
                  <Text style={styles.slideTitle}>{livro.nome}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Artigo do Dia */}
        <Text style={styles.sectionTitle}>Artigo do Dia</Text>
        <View style={styles.pagerContainer}>
          {artigosDoDia.length > 0 && (
            <ImageBackground source={require('../../../assets/images/img1.jpg')} style={styles.slide} imageStyle={{ borderRadius: 16, blurRadius: 5 }}>
              <View style={styles.overlay}>
                <TouchableOpacity onPress={() => router.push({ pathname: '/article', params: { nome: artigosDoDia[pagerIndex].nome, texto: artigosDoDia[pagerIndex].texto, path: 'Artigo do Dia' } })}>
                  <Text style={styles.slideTitle}>{artigosDoDia[pagerIndex].nome}</Text>
                  <Text style={styles.slideText} numberOfLines={4}>{artigosDoDia[pagerIndex].texto}</Text>
                  <Text style={{ marginTop: normalize(10), color: colors.primary }}>Ler mais...</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          )}
        </View>

        {/* Factos Curiosos */}
        <Text style={styles.sectionTitle}>Factos sobre a Lei</Text>
        <View style={styles.pagerContainer}>
          {factosCuriosos.length > 0 && (
            <ImageBackground source={require('../../../assets/images/imgA.jpg')} style={styles.slide} imageStyle={{ borderRadius: 16, blurRadius: 5 }}>
              <View style={styles.overlay}>
                <Text style={styles.slideTitle}>{factosCuriosos[factoIndex].titulo}</Text>
                <Text style={styles.slideText}>{factosCuriosos[factoIndex].descricao}</Text>
              </View>
            </ImageBackground>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
