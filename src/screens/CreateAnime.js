import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [releaseDate, setChosenDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [status, setStatus] = useState('Ongoing');

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

    const result = await ImagePicker.launchImageLibraryAsync();
    
    if (!result.cancelled) {
      setFormData({
        ...formData,
        coverImage: result.uri,
      });
    }
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
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        onChangeText={(text) => handleChange('type', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Episodes"
        onChangeText={(text) => handleChange('episodes', text)}
        keyboardType="numeric"
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
      />
      <TextInput
        style={styles.input}
        placeholder="External Link"
        onChangeText={(text) => handleChange('externalLink', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration"
        onChangeText={(text) => handleChange('duration', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating"
        onChangeText={(text) => handleChange('rating', text)}
      />
      {/* Add input fields for other properties */}
      <Button title="Upload cover image" onPress={handleImagePick} />
      {formData.coverImage && (
        <Image source={{ uri: formData.coverImage }} style={styles.image} />
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
