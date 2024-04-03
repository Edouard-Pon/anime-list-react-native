import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet, Image, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { setName, setOriginalName, setDescription, setImage, setAnime } from '../store/character';

export default function CreateCharacter() {
    const [name, setName] = useState('');
    const [originalName, setOriginalName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [anime, setAnime] = useState('');
    const dispatch = useDispatch();



    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleCreate = async () => {
        alert('WIP');
        // const action = await dispatch(createCharacter({ name, originalName, description, image, anime }));
        // if (action.payload === true) {
        //   alert('Character created successfully');
        // } else {
        //   alert(action.payload);
        // }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Original Name"
                value={originalName}
                onChangeText={setOriginalName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Anime"
                value={anime}
                onChangeText={setAnime}
            />
            <Button title="Upload cover image" onPress={handleImagePick} />
            {image ? (
                <>
                    <Button title="Clear image" onPress={() => setImage(null)} />
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                        onError={(error) => console.error('Image loading error:', error)}
                    />
                </>
            ) : (
                <Text>No image selected</Text>
            )}
            <Button title="Create" onPress={handleCreate} />
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
    image: {
        width: 200,
        height: 200,
        marginVertical: 10,
    },
});