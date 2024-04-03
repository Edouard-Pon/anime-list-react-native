import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { login } from '../store/user';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    const action = await dispatch(login({ username, password }));
    if (action.payload.username) {
      navigation.navigate('MainPage');
    } else {
      alert(action.payload);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default LoginPage;
