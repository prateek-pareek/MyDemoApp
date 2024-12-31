// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} // Hide the header on Login screen
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }} // Optional: Add a title for the Home screen
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ title: 'Item Details' }} // Optional: Add a title for the Detail screen
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
