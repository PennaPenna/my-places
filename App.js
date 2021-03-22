import React, { useState, useEffect } from 'react';
import SavedPlaces from './components/SavedPlaces';
import PlaceOnMap from './components/PlaceOnMap';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="SavedPlaces">
          <Stack.Screen name="SavedPlaces" component={SavedPlaces} />
          <Stack.Screen name="PlaceOnMap" component={PlaceOnMap} />
        </Stack.Navigator>
      </NavigationContainer>
  )
  };
