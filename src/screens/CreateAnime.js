import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [releaseDate, setChosenDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [status, setStatus] = useState('Ongoing');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || releaseDate;
    setShowPicker(false);
    setChosenDate(currentDate);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    episodes: '',
    status: '',
    description: '',
    releaseDate: '',
    source: '',
    externalLink: '',
    coverImage: null, // Changed to null initially
    coverImageType: '',
    genres: '',
    themes: '',
    duration: '',
    rating: '',
    character: '',
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

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        coverImage: result.assets[0].uri,
      });
    }
  };

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    // Implement logic to handle form submission
    console.log(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Anime</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={(text) => handleChange('title', text)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        onChangeText={(text) => handleChange('type', text)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Episodes"
        onChangeText={(text) => handleChange('episodes', text)}
        keyboardType="numeric"
        required
      />

      <Text >Select Status</Text>
      <Picker
        selectedValue={status}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => handleStatusChange(itemValue)}
      >
        <Picker.Item label="Ongoing" value="Ongoing" />
        <Picker.Item label="Announced" value="Announced" />
        <Picker.Item label="Out" value="Out" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(text) => handleChange('description', text)}
        required
      />

      <Button title="Choose release date" onPress={showDatePicker} />
      {showPicker && (
        <DateTimePicker
          value={releaseDate}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}
      <Text>Release Date: {formatDate(releaseDate)}</Text>

      <TextInput
        style={styles.input}
        placeholder="Source"
        onChangeText={(text) => handleChange('source', text)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="External Link"
        onChangeText={(text) => handleChange('externalLink', text)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (hours)"
        onChangeText={(text) => handleChange('duration', text)}
        keyboardType="numeric"
        required
      />
      <Text >Select Rating</Text>
      <Picker
        selectedValue={rating}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => handleRatingChange(itemValue)}
      >
        <Picker.Item label="Family Friendly" value="13" />
        <Picker.Item label="Teen" value="16" />
        <Picker.Item label="18+" value="18" />
      </Picker>


      <Button title="Upload cover image" onPress={handleImagePick} />
      {formData.coverImage ? (
        <Image
          source={{ uri: formData.coverImage }}
          style={styles.image}
          onError={(error) => console.error('Image loading error:', error)}
        />
      ) : (
        <Text>No image selected</Text>
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
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});
