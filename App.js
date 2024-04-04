import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import store from './src/store/configureStore';
import AppNavigator from './src/navigation/AppNavigator';
import {useFonts} from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    Pacifico: require('./assets/fonts/Pacifico-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <View style={styles.container}>
          <AppNavigator />
          <StatusBar style="auto" />
        </View>
      </PaperProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
