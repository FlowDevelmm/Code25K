import React from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Link, Stack } from 'expo-router';
import { useTheme } from '../../../ThemeContext';
import { codigoCivil } from '../../../data';
import { MaterialIcons } from '@expo/vector-icons';
import { normalize } from '../../../utils/normalize';

export default function LivrosScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Código" titleStyle={styles.title} />
      </Appbar.Header>
      <FlatList
        data={codigoCivil}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Link href={{ pathname: '/codigo/titulos', params: { livroIndex: index } }} asChild>
            <TouchableOpacity style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.nome}</Text>
              <MaterialIcons name="chevron-right" size={24} color={colors.text} />
            </TouchableOpacity>
          </Link>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
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
  title: { fontFamily: 'SF-Pro-Display-Bold', fontSize: normalize(22), lineHeight: normalize(22) * 1.5, color: colors.text, textAlign: 'center' },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
  },
  itemText: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 18,
    lineHeight: 18 * 1.5,
    color: colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 16,
  },
});
