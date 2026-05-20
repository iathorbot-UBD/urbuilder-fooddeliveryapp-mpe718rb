import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />
        <AppNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}