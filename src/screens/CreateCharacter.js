import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet, Image, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { createCharacter } from '../store/character';
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
            setImage(result.assets[0]);
        }
    };

    const handleCreate = async () => {
        const action = await dispatch(createCharacter({ name, originalName, description, image, anime }));
        if (action.payload !== undefined && action.payload.name) {
          alert('Character created successfully');
        } else {
          alert('Error creating character');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageAndInputsContainer}>
                <View style={styles.imageContainer}>
                    {image ? (
                        <Image
                            source={{ uri: image.uri }}
                            style={styles.image}
                            onError={(error) => console.error('Image loading error:', error)}
                        />
                    ) : (
                        <View style={styles.noImagePlaceholder}>
                            <Text>No image selected</Text>
                        </View>
                    )}
                </View>
                <View style={styles.inputsContainer}>
                    <TextInput
                        style={styles.topInput}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.topInput}
                        placeholder="Original Name"
                        value={originalName}
                        onChangeText={setOriginalName}
                    />
                    <TextInput
                        style={styles.topInput}
                        placeholder="Anime"
                        value={anime}
                        onChangeText={setAnime}
                    />
                    <View style={styles.buttonContainer}>
                        {!image && (
                            <Button style={styles.button} title="Upload image" onPress={handleImagePick} />
                        )}
                        {image && (
                            <Button style={styles.button} title="Clear image" onPress={() => setImage(null)} />
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.descriptionContainer}>
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Description"
                    multiline={true}
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                />
            </View>

            <Button title="Create" onPress={handleCreate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 16,
        backgroundColor: 'white',
    },
    imageAndInputsContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    imageContainer: {
        marginRight: 16,
    },
    noImagePlaceholder: {
        width: 160,
        height: 240,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    image: {
        width: 160,
        height: 240,
        borderRadius: 10,
    },
    inputsContainer: {
        flex: 1,
    },
    input: {
        height: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        paddingLeft: 8,
        marginBottom: 16,
    },
    topInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        marginBottom: 20,
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 16,
    },
    button: {
        height: 60,
    },
    descriptionContainer: {
        marginBottom: 16,
    },
    descriptionInput: {
        height: 120,
        borderWidth: 3,
        padding: 8,
        textAlignVertical: 'top',
    },
});