import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import RestaurantListScreen from '../screens/RestaurantListScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  HomeTabs: undefined;
  RestaurantDetail: { restaurantId: string };
};

export type TabParamList = {
  Home: undefined;
  Restaurants: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const icons: Record<string, string> = { Home: '🏠', Restaurants: '🍽️', Cart: '🛒', Profile: '👤' };
  return (
    <View style={styles.tabIcon}>
      <Text style={styles.tabEmoji}>{icons[label]}</Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
    </View>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Home" focused={focused} /> }} />
      <Tab.Screen name="Restaurants" component={RestaurantListScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Restaurants" focused={focused} /> }} />
      <Tab.Screen name="Cart" component={CartScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Cart" focused={focused} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Profile" focused={focused} /> }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1A1A1A',
    borderTopColor: '#2C2C2C',
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 8,
  },
  tabIcon: { alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  tabEmoji: { fontSize: 20 },
  tabLabel: { fontSize: 10, color: '#666', marginTop: 2 },
  tabLabelActive: { color: '#FF6B35' },
});