// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F8F8F8",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 6,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={28}
              color={focused ? "#007AFF" : "#4A4A4A"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="codigo"
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="book"
              size={28}
              color={focused ? "#007AFF" : "#4A4A4A"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pesquisa"
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="search"
              size={28}
              color={focused ? "#007AFF" : "#4A4A4A"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mais"
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="more-horizontal"
              size={28}
              color={focused ? "#007AFF" : "#4A4A4A"}
            />
          ),
        }}
      />
    </Tabs>
  );
}