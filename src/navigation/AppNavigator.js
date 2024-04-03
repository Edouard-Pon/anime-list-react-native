import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '../screens/MainPage';
import AnimePage from '../screens/AnimePage';
import CharacterPage from '../screens/CharacterPage';
import CharactersPage from '../screens/CharactersPage';
import CreateAnimePage from '../screens/CreateAnime';
import CreateCharacterPage from '../screens/CreateCharacter';
import LoginPage from '../screens/LoginPage';
import SignupPage from '../screens/SignupPage';
import ProfilePage from '../screens/ProfilePage';

import { Menu, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { openMenu, closeMenu } from '../store/menu';

const Stack = createStackNavigator();

function AppNavigator() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.menu.isOpen);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <Menu
              visible={isMenuOpen}
              onDismiss={() => dispatch(closeMenu())}
              anchor={<Button onPress={() => dispatch(openMenu())}>Menu</Button>}
            >
              <Menu.Item onPress={() => { navigation.navigate('MainPage'); dispatch(closeMenu()); }} title="MainPage" />
              <Menu.Item onPress={() => { navigation.navigate('LoginPage'); dispatch(closeMenu()); }} title="Login" />
              <Menu.Item onPress={() => { navigation.navigate('SignupPage'); dispatch(closeMenu()); }} title="Signup" />
              <Menu.Item onPress={() => { navigation.navigate('CharactersPage'); dispatch(closeMenu()); }} title="Characters" />
              <Menu.Item onPress={() => { navigation.navigate('CreateAnime'); dispatch(closeMenu()); }} title="Create Anime" />
              <Menu.Item onPress={() => { navigation.navigate('CreateCharacter'); dispatch(closeMenu()); }} title="Create Character" />
              <Menu.Item onPress={() => { navigation.navigate('Profile'); dispatch(closeMenu()); }} title="Profile" />
            </Menu>
          ),
        })}
      >
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="AnimePage" component={AnimePage} />
        <Stack.Screen name="CharacterPage" component={CharacterPage} />
        <Stack.Screen name="CharactersPage" component={CharactersPage} />
        <Stack.Screen name="CreateAnime" component={CreateAnimePage} />
        <Stack.Screen name="CreateCharacter" component={CreateCharacterPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
