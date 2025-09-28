import { Tabs } from "expo-router";
import { Home, Book, Search, MoreHorizontal } from "lucide-react-native";
import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { List, Divider, Appbar, Switch } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useTheme } from '../../ThemeContext';
import { normalize } from '../../utils/normalize';

export default function Layout() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: 'transparent',
    },
    title: {
        fontFamily: 'SF-Pro-Display-Bold',
        fontSize: normalize(22),
        lineHeight: normalize(22) * 1.5,
        color: colors.text,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
  });

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            left: 60,
            right: 60,
            backgroundColor: colors.card,
            borderRadius: 50,
            height: 70,
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
          tabBarItemStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
          },
        }}
      >
        {/* Home */}
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <Home size={28} color={focused ? colors.primary : colors.textSecondary} />
            ),
          }}
        />

        {/* Código Civil */}
        <Tabs.Screen
          name="codigo"
          options={{
            tabBarIcon: ({ focused }) => (
              <Book size={28} color={focused ? colors.primary : colors.textSecondary} />
            ),
          }}
        />

        {/* Pesquisa */}
        <Tabs.Screen
          name="pesquisa"
          options={{
            headerShown: false,
            title: 'Pesquisa',
            headerTitleStyle: { fontFamily: 'SF-Pro-Display-Bold', color: colors.text },
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
            headerTintColor: colors.text,
            tabBarIcon: ({ focused }) => (
              <Search size={28} color={focused ? colors.primary : colors.textSecondary} />
            ),
          }}
        />

        {/* Mais */}
        <Tabs.Screen
          name="mais"
          options={{
            tabBarIcon: ({ focused }) => (
              <MoreHorizontal size={28} color={focused ? colors.primary : colors.textSecondary} />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity {...props} onPress={() => setModalVisible(true)} />
            ),
          }}
        />
      </Tabs>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Appbar.Header style={styles.header}>
              <Appbar.Content title="Mais Opções" titleStyle={styles.title} style={{ alignItems: 'center' }} />
            </Appbar.Header>
            <List.Section>
              <List.Item
                title="Favoritos"
                left={() => <List.Icon icon="star" color={colors.text} />}
                onPress={() => {
                  router.push('./mais/opcoes/favoritos');
                  setModalVisible(false);
                }}
                titleStyle={{ fontFamily: 'SF-Pro-Display-Regular', color: colors.text }}
              />
              <Divider />
              <List.Item
                title="Anotações"
                left={() => <List.Icon icon="note-edit" color={colors.text} />}
                onPress={() => {
                  router.push('./mais/opcoes/anotacoes');
                  setModalVisible(false);
                }}
                titleStyle={{ fontFamily: 'SF-Pro-Display-Regular', color: colors.text }}
              />
              <Divider />
              <List.Item
                title="Sobre"
                left={() => <List.Icon icon="information" color={colors.text} />}
                onPress={() => { /* Navegar para a tela Sobre */ }}
                titleStyle={{ fontFamily: 'SF-Pro-Display-Regular', color: colors.text }}
              />
              <Divider />
              <List.Item
                title="Contactos"
                left={() => <List.Icon icon="email" color={colors.text} />}
                onPress={() => { /* Navegar para a tela Contactos */ }}
                titleStyle={{ fontFamily: 'SF-Pro-Display-Regular', color: colors.text }}
              />
              <Divider />
              <List.Item
                title="Dark Mode"
                left={() => <List.Icon icon="theme-light-dark" color={colors.text} />}
                right={() => <Switch value={isDarkMode} onValueChange={toggleTheme} />}
                titleStyle={{ fontFamily: 'SF-Pro-Display-Regular', color: colors.text }}
              />
            </List.Section>
          </View>
        </View>
      </Modal>
    </>
  );
}
