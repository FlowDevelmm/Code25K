import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../../ThemeContext';

export default function AnotacoesScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anotações</Text>
      <Text style={styles.subtitle}>Funcionalidade em desenvolvimento</Text>
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 10,
  },
});
