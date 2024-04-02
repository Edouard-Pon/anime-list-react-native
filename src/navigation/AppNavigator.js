import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from '../screens/MainPage';
import AnimePage from '../screens/AnimePage';
import CharacterPage from '../screens/CharacterPage';
import CharactersPage from '../screens/CharactersPage';
import CreateAnimePage from '../screens/CreateAnime';
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
              <Menu.Item onPress={() => { navigation.navigate('CharactersPage'); dispatch(closeMenu()); }} title="Characters" />
              <Menu.Item onPress={() => { navigation.navigate('CreateAnime'); dispatch(closeMenu()); }} title="Create Anime" />
            </Menu>
          ),
        })}
      >
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="AnimePage" component={AnimePage} />
        <Stack.Screen name="CharacterPage" component={CharacterPage} />
        <Stack.Screen name="CharactersPage" component={CharactersPage} />
        <Stack.Screen name="CreateAnime" component={CreateAnimePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
