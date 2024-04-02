import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from '../screens/MainPage';
import AnimePage from '../screens/AnimePage';
import CharacterPage from '../screens/CharacterPage';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="AnimePage" component={AnimePage} />
        <Stack.Screen name="CharacterPage" component={CharacterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
