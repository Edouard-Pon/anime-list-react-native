import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CreateCharacter() {
    const [formData, setFormData] = useState({
        name: '',
        originalName: '',
        description: '',
        image: null,
        anime: '',
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.canceled) {
            setFormData({
                ...formData,
                image: result.uri,
            });
        }
    };

    const handleSubmit = () => {
        // Implement logic to handle form submission
        console.log(formData);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Character</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => handleChange('name', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Original Name"
                onChangeText={(text) => handleChange('originalName', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={(text) => handleChange('description', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Anime"
                onChangeText={(text) => handleChange('anime', text)}
            />
            <Button title="Upload image" onPress={handleImagePick} />
            {formData.image && (
                <Image source={{ uri: formData.image }} style={styles.image} />
            )}
            <Button title="Create" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 10,
    },
});