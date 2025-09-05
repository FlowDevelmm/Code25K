import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { SwipeListView } from 'react-native-swipe-list-view';

interface Favorite {
  id: string;
  text: string; // Agora o texto será HTML
}

export default function FavoritosScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favoritedArticles'); // Changed key
      if (savedFavorites !== null) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites.', error);
    }
  };

  const handleDeleteFavorite = async (articleName: string) => {
    try {
      const newFavorites = favorites.filter((name) => name !== articleName);
      setFavorites(newFavorites);
      await AsyncStorage.setItem('favoritedArticles', JSON.stringify(newFavorites)); // Changed key
    } catch (error) {
      console.error('Failed to delete favorite.', error);
    }
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
        <TouchableOpacity
            style={[styles.backBtn, styles.backLeftBtn]}
            onPress={() => handleDeleteFavorite(data.item)}
        >
            <Text style={styles.backTextWhite}>Apagar</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
        <SwipeListView
            data={favorites}
            renderItem={({ item }) => (
                <View style={styles.favoriteBox}>
                    <Text style={styles.favoriteText}>{item}</Text>
                </View>
            )}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
            keyExtractor={(item) => item}
            style={styles.list}
            contentContainerStyle={{ paddingBottom: 80 }}
            ListEmptyComponent={<Text style={styles.semFavorites}>Nenhum favorito ainda.</Text>}
          />
    </View>
  );
}

// --- ESTILOS ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  
  // --- Estilos do Modo de Lista ---
  list: {
    flex: 1,
  },
  semFavorites: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 40,
  },
  favoriteBox: {
    backgroundColor: 'white',
    padding: 20, // Aumentado para dar mais espaço
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  favoriteText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    marginBottom: 15,
    borderRadius: 8,
  },
  backBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backLeftBtn: {
    backgroundColor: '#00bfff',
    left: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  backRightBtn: {
    backgroundColor: '#ff4d4d',
    right: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  backTextWhite: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});