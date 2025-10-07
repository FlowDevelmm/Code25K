import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Share, Linking, Platform, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useTheme } from '../../../ThemeContext';
import { Appbar } from 'react-native-paper';
import { normalize } from '../../../utils/normalize';

const options = [
  { title: 'Anotações', icon: 'file-text', screen: '/(tabs)/mais/opcoes/anotacoes' },
  { title: 'Favoritos', icon: 'star', screen: '/(tabs)/mais/opcoes/favoritos' },
  { title: 'Configurações', icon: 'settings', screen: '/(tabs)/mais/opcoes/configuracoes' },
  { title: 'Ajuda', icon: 'help-circle', action: 'help' },
  { title: 'Sobre o App', icon: 'info', action: 'about' },
  { title: 'Compartilhar', icon: 'share-2', action: 'share' },
  { title: 'Avaliar o App', icon: 'star', action: 'rate' },
];

export default function MaisScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const handlePress = (item) => {
    if (item.screen) {
      router.push(item.screen);
    } else if (item.action) {
      switch (item.action) {
        case 'help':
          WebBrowser.openBrowserAsync('https://www.google.com');
          break;
        case 'about':
          Alert.alert("Sobre o App", "Código Civil Digital v1.0.0\nDesenvolvido pela Learn Code");
          break;
        case 'share':
          Share.share({
            message: 'Confira o aplicativo Código Civil Digital!',
            url: 'https://example.com/app-link',
            title: 'Código Civil Digital',
          });
          break;
        case 'rate':
          if (Platform.OS === 'ios') {
            Linking.openURL('itms-apps://itunes.apple.com/app/idYOUR_APP_ID');
          } else {
            Linking.openURL('market://details?id=com.yourcompany.yourapp');
          }
          break;
        default:
          break;
      }
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.optionButton} onPress={() => handlePress(item)}>
      <Feather name={item.icon} size={24} color={colors.icon} style={styles.optionIcon} />
      <Text style={styles.optionText}>{item.title}</Text>
      <Feather name="chevron-right" size={24} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Mais" titleStyle={styles.title} />
      </Appbar.Header>
      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  title: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: normalize(22),
    lineHeight: normalize(22) * 1.5,
    color: colors.text,
    textAlign: 'center'
  },
  listContainer: {
    paddingTop: normalize(20),
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(20),
    backgroundColor: colors.card,
    borderBottomWidth: normalize(1),
    borderBottomColor: colors.border,
  },
  optionIcon: {
    marginRight: normalize(15),
  },
  optionText: {
    flex: 1,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: normalize(18),
    color: colors.text,
  },
});
