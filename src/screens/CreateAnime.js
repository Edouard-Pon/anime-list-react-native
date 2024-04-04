import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, View, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import { createAnime, setFormData } from '../store/anime';
import { searchCharacter } from '../store/character';
import { FlatList } from 'react-native-gesture-handler';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);

export default function CreateAnime() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [episodes, setEpisodes] = useState('');
  const [status, setStatus] = useState('Ongoing');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [source, setSource] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [cover, setCover] = useState(null);
  const [genres, setGenres] = useState([]);
  const [themes, setThemes] = useState([]);
  const [duration, setDuration] = useState('');
  const [rating, setRating] = useState('');
  const [character, setCharacter] = useState([]);

  const [characterQuery, setCharacterQuery] = useState('');
  const [characterSearchResults, setCharacterSearchResults] = useState([]);
  const [hideCharacterResults, setHideCharacterResults] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (characterQuery.length > 2) {
      dispatch(searchCharacter(characterQuery)).then((action) => {
        if (action.payload) {
          setCharacterSearchResults(action.payload);
        }
      });
    }
  }, [characterQuery, dispatch]);

  const handleCharacterSelection = (id) => {
    setCharacter((prevCharacter) => {
      if (prevCharacter.includes(id)) {
        return prevCharacter.filter((characterId) => characterId !== id);
      } else {
        return [...prevCharacter, id];
      }
    });
  };

  const handleCharacterQueryChange = (text) => {
    setCharacterQuery(text);
    if (text.length > 2) setHideCharacterResults(false);
    else setHideCharacterResults(true);
  };

  const [openRating, setOpenRating] = useState(false);
  const [valueRating, setValueRating] = useState(null);
  const [itemsRating, setItemsRating] = useState([
    { label: 'Family Friendly', value: '13' },
    { label: 'Teen', value: '16' },
    { label: 'Mature', value: '18' },
  ]);

  const [openStatus, setOpenStatus] = useState(false);
  const [valueStatus, setValueStatus] = useState(null);
  const [itemsStatus, setItemsStatus] = useState([
    { label: 'Ongoing', value: 'Ongoing' },
    { label: 'Out', value: 'Out' },
    { label: 'Announced', value: 'Announced' },
  ]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(releaseDate || Date.now());
    setReleaseDate(currentDate.toISOString());
    setShowDatePicker(false);
  };  

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
      setCover(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      title,
      type,
      episodes,
      status,
      description,
      releaseDate,
      source,
      externalLink,
      cover,
      genres,
      themes,
      duration,
      rating,
      character,
    };
    dispatch(createAnime(formData));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Anime</Text>

      {cover ? (
        <>
          <Button title="Clear image" onPress={() => setCover(null)} />
          <Image
            source={{ uri: cover.uri }}
            style={styles.image}
            onError={(error) => console.error('Image loading error:', error)}
          />
        </>
      ) : (
        <>
          <Button title="Upload cover image" onPress={handleImagePick} />
          <Text>No image selected</Text>
        </>
      )}

      <Autocomplete
        style={{ width: Dimensions.get('window').width * 0.6 }}
        hideResults={hideCharacterResults}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={'Search character...'}
        data={characterSearchResults}
        value={characterQuery}
        onChangeText={(text) => handleCharacterQueryChange(text)}
        flatListProps={{
          keyExtractor: (item) => item._id,
          renderItem: ({ item }) => (
            <TouchableOpacity onPress={() => handleCharacterSelection(item._id)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <View>
        {character.map((characterId) => {
          const selectedCharacter = characterSearchResults.find((character) => character._id === characterId);
          return (
            <Text key={characterId}>{selectedCharacter.name}</Text>
          );
        })}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={setTitle}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        onChangeText={setType}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Episodes"
        onChangeText={setEpisodes}
        keyboardType="numeric"
        required
      />

      <DropDownPicker
        placeholder={'Select status'}
        open={openStatus}
        value={valueStatus}
        items={itemsStatus}
        style={styles.input}
        setOpen={setOpenStatus}
        setValue={setValueStatus}
        setItems={setItemsStatus}
        onChangeValue={(itemValue, itemIndex) => {
          setValueStatus(itemValue);
          setStatus(itemValue);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={setDescription}
        required
      />

      <Button title="Pick Release Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={releaseDate ? new Date(releaseDate) : new Date()}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}
      <Text>Release Date: {releaseDate ? new Date(releaseDate).toLocaleDateString() : 'No date selected'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Source"
        onChangeText={setSource}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="External Link"
        onChangeText={setExternalLink}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (mins per episode)"
        onChangeText={setDuration}
        keyboardType="numeric"
        required
      />

      <DropDownPicker
        placeholder={'Select rating'}
        open={openRating}
        value={valueRating}
        items={itemsRating}
        style={styles.input}
        setOpen={setOpenRating}
        setValue={setValueRating}
        setItems={setItemsRating}
        onChangeValue={(itemValue, itemIndex) => {
          setValueRating(itemValue);
          setRating(itemValue);
        }}
      />

      <Button title="Submit" onPress={handleSubmit} disabled={!title} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    alignSelf: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderWidth: 3,
    borderColor: 'black',
  },
});
