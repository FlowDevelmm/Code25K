
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, Stack } from 'expo-router';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useTheme } from '../ThemeContext';

export default function FavoritosScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [favorites, setFavorites] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favoritedArticles');
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
      await AsyncStorage.setItem('favoritedArticles', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Failed to delete favorite.', error);
    }
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => handleDeleteFavorite(data.item)}
      >
        <Text style={styles.backTextWhite}>Apagar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Favoritos' }} />
      <SwipeListView
        data={favorites}
        renderItem={({ item }) => (
          <View style={styles.favoriteBox}>
            <Text style={styles.favoriteText}>{item}</Text>
          </View>
        )}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        keyExtractor={(item) => item}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum favorito ainda.</Text>}
      />
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: colors.text,
  },
  favoriteBox: {
    backgroundColor: colors.card,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  favoriteText: {
    fontSize: 16,
    color: colors.text,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ff4d4d',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#ff4d4d',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
