import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { login } from '../store/user';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';


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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'white'
    },
    input: {
        height: 55,
        marginBottom: 16,
        paddingLeft: 15,
        borderRadius: 5,
        backgroundColor: 'white',
        borderBottomWidth: 3,
    },
    button: {
        backgroundColor: 'rgba(255, 155, 155, 0.7)',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
});

export default LoginPage;
