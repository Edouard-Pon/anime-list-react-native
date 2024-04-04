import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from "../store/user";
import AnimeCard from '../components/AnimeCard';

export default function ProfilePage({ navigation }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please log in to view your profile.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignupPage')}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
  };

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
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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

      {/* Add a button to display favorite animeCards under profile */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Favorite Anime</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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
    backgroundColor: 'rgba(255, 155, 155, 0.7)',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});
