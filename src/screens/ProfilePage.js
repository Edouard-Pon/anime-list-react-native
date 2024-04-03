import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
    
  // Sample user data (replace with actual user data)
  const [user, setUser] = useState({
    profilePicture: 'https://via.placeholder.com/150',
    username: 'JohnDoe',
    theme: 'light',
    email: 'johndoe@example.com',
  });

  // Accéder à l'API Redux pour obtenir les informations de l'utilisateur
//   const userInfo = useSelector(state => state.user.userInfo);
//   const [user, setUser] = useState({
//       profilePicture: 'https://via.placeholder.com/150',
//       username: userInfo.username,
//       theme: userInfo.theme,
//       email: userInfo.email,
//   });

  const changeTheme = () => {
    setUser({ ...user, theme: user.theme === 'light' ? 'dark' : 'light' });
  };

  const deleteAccount = () => {
    // Implement logic to delete user account
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.text}>{user.username}</Text>
      <Text style={styles.label}>Theme:</Text>
      <Text style={styles.text}>{user.theme}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{user.email}</Text>
      <TouchableOpacity onPress={changeTheme} style={styles.button}>
        <Text style={styles.buttonText}>Change Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteAccount} style={[styles.button, styles.deleteButton]}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
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
