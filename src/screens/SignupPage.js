import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { signup } from '../store/user';


function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSignup = async () => {
    const action = await dispatch(signup({ username, password }));
    if (action.payload === true) {
      navigation.navigate('LoginPage');
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
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
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
    height: 55,
    marginBottom: 16,
    paddingLeft: 15,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'rgba(173,120,255,0.58)',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default SignupPage;
