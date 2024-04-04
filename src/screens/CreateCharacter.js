import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {createCharacter} from '../store/character';
import Autocomplete from 'react-native-autocomplete-input';
import {setName, setOriginalName, setDescription, setImage, setAnime} from '../store/character';
import {searchAnime} from '../store/anime';

export default function CreateCharacter() {
  const [name, setName] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [anime, setAnime] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hideResults, setHideResults] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.length > 2) {
      dispatch(searchAnime(query)).then((action) => {
        if (action.payload) {
          setSearchResults(action.payload);
        }
      });
    }
  }, [query, dispatch]);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleCreate = async () => {
    const action = await dispatch(createCharacter({name, originalName, description, image, anime}));
    if (action.payload !== undefined && action.payload.name) {
      alert('Character created successfully');
    } else {
      alert('Error creating character');
    }
  };

  const handleAnimeSelection = (id) => {
    setAnime((prevAnime) => {
      if (prevAnime.includes(id)) {
        return prevAnime.filter((animeId) => animeId !== id);
      } else {
        return [...prevAnime, id];
      }
    });
  };

  const handleQueryChange = (text) => {
    setQuery(text);
    if (text.length > 2) setHideResults(false);
    else setHideResults(true);
  };

  return (
      <View style={styles.container}>
        <View style={styles.imageAndInputsContainer}>
          <View style={styles.imageContainer}>
            {image ? (
                <Image
                    source={{uri: image.uri}}
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
            <Autocomplete
                hideResults={hideResults}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={'Search anime...'}
                data={searchResults}
                value={query}
                onChangeText={(text) => handleQueryChange(text)}
                flatListProps={{
                  keyExtractor: (item) => item._id,
                  renderItem: ({item}) => (
                      <TouchableOpacity onPress={() => handleAnimeSelection(item._id)}>
                        <Text>{item.title}</Text>
                      </TouchableOpacity>
                  ),
                }}
            />
            <View>

              {anime.map((animeId) => {
                const selectedAnime = searchResults.find((anime) => anime._id === animeId);
                return (
                    <Text key={animeId}>{selectedAnime.title}</Text>
                );
              })}
            </View>
            <View style={styles.buttonContainer}>
              {!image && (
                  <TouchableOpacity style={styles.button} onPress={handleImagePick}>
                    <Text style={styles.buttonText}>Upload image</Text>
                  </TouchableOpacity>
              )}
              {image && (
                  <TouchableOpacity style={styles.button} onPress={() => setImage(null)}>
                    <Text style={styles.buttonText}>Clear image</Text>
                  </TouchableOpacity>
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
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
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
    borderBottomWidth: 3,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: '#fdcdd3',
    borderBottomColor: '#d2a5ac',
    opacity: 0.5,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'rgba(255, 155, 155, 0.7)',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionInput: {
    height: 120,
    borderBottomWidth: 3,
    borderBottomColor: '#d2a5ac',
    padding: 8,
    textAlignVertical: 'top',
    backgroundColor: '#fdcdd3',
    opacity: 0.5,
  },
});
