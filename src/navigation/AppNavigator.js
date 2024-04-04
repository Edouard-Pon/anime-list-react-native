import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import MainPage from '../screens/MainPage';
import CharactersPage from '../screens/CharactersPage';
import CreateAnimePage from '../screens/CreateAnime';
import CreateCharacterPage from '../screens/CreateCharacter';
import LoginPage from '../screens/LoginPage';
import SignupPage from '../screens/SignupPage';
import ProfilePage from '../screens/ProfilePage';
import AnimePage from '../screens/AnimePage';
import CharacterPage from '../screens/CharacterPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'MainPage') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'CharactersPage') {
                                iconName = focused ? 'people' : 'people-outline';
                            } else if (route.name === 'CreateAnime') {
                                iconName = focused ? 'add-circle' : 'add-circle-outline';
                            } else if (route.name === 'CreateCharacter') {
                                iconName = focused ? 'person-add' : 'person-add-outline';
                            } else if (route.name === 'Profile') {
                                iconName = focused ? 'person' : 'person-outline';
                            }

                            return <Icon name={iconName} size={size} color={color} />;
                        },
                        tabBarLabel: '',
                    })}
                    tabBarOptions={{
                        headerShown: false,
                        activeTintColor: 'pink',
                        inactiveTintColor: 'gray',
                        style: {
                            backgroundColor: '#d2a5ac',
                        },
                        labelStyle: {
                            fontSize: 16,
                            fontWeight: 'bold',
                            display: 'none',
                        },
                    }}
                >
                    <Tab.Screen name="MainPage" component={MainPage} />
                    <Tab.Screen name="CharactersPage" component={CharactersPage} />
                    <Tab.Screen name="CreateAnime" component={CreateAnimePage} />
                    <Tab.Screen name="CreateCharacter" component={CreateCharacterPage} />
                    <Tab.Screen name="Profile" component={ProfilePage} />
                    <Stack.Screen name="AnimePage" component={AnimePage} options={{ tabBarButton: () => null }} />
                    <Stack.Screen name="CharacterPage" component={CharacterPage} options={{ tabBarButton: () => null }} />
                    <Stack.Screen name="LoginPage" component={LoginPage} options={{ tabBarButton: () => null }}/>
                    <Stack.Screen name="SignupPage" component={SignupPage} options={{ tabBarButton: () => null }}/>
                </Tab.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
}

export default AppNavigator;
