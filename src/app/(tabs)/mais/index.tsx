import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../ThemeContext';
import { normalize } from '../../../utils/normalize';

export default function MaisScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.card,
    },
    title: {
        fontSize: normalize(22),
        fontWeight: 'bold',
    }
  });

  return (
    <View style={styles.container}>
        <Appbar.Header style={styles.header}>
            <Appbar.Content title="Mais Opções" titleStyle={styles.title} />
        </Appbar.Header>
        <List.Section>
            <List.Item
                title="Favoritos"
                left={() => <List.Icon icon="star" />}
                onPress={() => router.push('./opcoes/favoritos')}
            />
            <Divider />
            <List.Item
                title="Anotações"
                left={() => <List.Icon icon="note-edit" />}
                onPress={() => router.push('./opcoes/anotacoes')}
            />
            <Divider />
            <List.Item
                title="Sobre"
                left={() => <List.Icon icon="information" />}
                onPress={() => { /* Navegar para a tela Sobre */ }}
            />
            <Divider />
            <List.Item
                title="Contactos"
                left={() => <List.Icon icon="email" />}
                onPress={() => { /* Navegar para a tela Contactos */ }}
            />
        </List.Section>
    </View>
  );
}