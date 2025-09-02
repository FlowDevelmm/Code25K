import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';

export default function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5a586dff" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Codigo</Text>
        <Text style={styles.subtitle}>Civil</Text>
      </View>

      <View style={styles.codigoCivilContainer}>
        <Text style={styles.codigoCivilText}>CodigoCivil</Text>
      </View>

      <View style={styles.searchSection}>
        <Text style={styles.searchLabel}>Pesquise por ...</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite aqui..."
            placeholderTextColor="#052fdaff"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Quatro partes abaixo da barra de pesquisa */}
      <View style={styles.partsContainer}>
        <View style={styles.partRow}>
          <View style={styles.partBox}>
            <Text style={styles.partNumber}>1</Text>
            <Text style={styles.partTitle}>Parte Geral</Text>
          </View>
          <View style={styles.partBox}>
            <Text style={styles.partNumber}>2</Text>
            <Text style={styles.partTitle}>Direito das Obrigações</Text>
          </View>
        </View>
        <View style={styles.partRow}>
          <View style={styles.partBox}>
            <Text style={styles.partNumber}>3</Text>
            <Text style={styles.partTitle}>Direito das Coisas</Text>
          </View>
          <View style={styles.partBox}>
            <Text style={styles.partNumber}>4</Text>
            <Text style={styles.partTitle}>Direito de Família</Text>
          </View>
        </View>
      </View>

      <View style={styles.bibleSection}>
        
      </View>



      <View style={styles.footer}>
        <Text style={styles.footerText}>Learn_Code</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101527',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'Times New Roman',
    color: '#ecf0f1',
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'Times New Roman',
    color: '#ecf0f1',
    textAlign: 'center',
    letterSpacing: 2,
    marginTop: -5,
  },
  codigoCivilContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  codigoCivilText: {
    fontSize: 20,
    fontWeight: 'Times New Roman',
    color: '#f39c12',
    textAlign: 'center',
    letterSpacing: 1,
  },
  searchSection: {
    marginBottom: 25,
  },
  searchLabel: {
    fontSize: 18,
    color: '#bdc3c7',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '500',
  },
  searchContainer: {
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
    elevation: 3,
  },
  searchInput: {
    fontSize: 18,
    color: '#2c3e50',
    height: 50,
    textAlign: 'center',
  },
  // Estilos para as quatro partes
  partsContainer: {
    marginBottom: 30,
  },
  partRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  partBox: {
    width: '48%',
    backgroundColor: '#34495e',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  partNumber: {
    fontSize: 24,
    fontWeight: 'Times New Roman',
    color: '#f39c12',
    marginBottom: 5,
  },
  partTitle: {
    fontSize: 14,
    color: '#ecf0f1',
    textAlign: 'center',
    fontWeight: '500',
  },
  bibleSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  bibleTitle: {
    fontSize: 36,
    fontWeight: 'Times New Roman',
    color: '#ecf0f1',
    textAlign: 'center',
    letterSpacing: 2,
  },
  wordOfDay: {
    fontSize: 22,
    color: '#f39c12',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});