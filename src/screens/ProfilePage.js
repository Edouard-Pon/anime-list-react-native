import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const userInfo = useSelector((state) => state.user.userInfo);

  if (!userInfo) {
    return <Text>Loading...</Text>;
  }

  const { username, role } = userInfo || {};
    
  // Sample user data (replace with actual user data)
  // const [user, setUser] = useState({
  //   profilePicture: 'https://via.placeholder.com/150',
  //   username: 'JohnDoe',
  //   theme: 'light',
  //   email: 'johndoe@example.com',
  // });

  // const changeTheme = () => {
  //   setUser({ ...user, theme: user.theme === 'light' ? 'dark' : 'light' });
  // };

  return (
    <View style={styles.container}>
      {/*<Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />*/}
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.text}>{username}</Text>
      <Text style={styles.label}>Role:</Text>
      <Text style={styles.text}>{role}</Text>
      {/*<Text style={styles.label}>Theme:</Text>*/}
      {/*<Text style={styles.text}>{user.theme}</Text>*/}
      {/*<TouchableOpacity onPress={changeTheme} style={styles.button}>*/}
      {/*  <Text style={styles.buttonText}>Change Theme</Text>*/}
      {/*</TouchableOpacity>*/}

      {/* three widgets aligned: to-watch, watch, abandoned */}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>To Watch</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Watched</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity style={[styles.button, styles.deleteButton]}>
            <Text style={styles.buttonText}>Abandoned</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TODO: When button is clicked, display the appropriate anime AnimeCards */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});
