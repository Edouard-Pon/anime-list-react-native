import { Link } from 'expo-router';
import { View, StyleSheet, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, selectUserAuth } from "@/store/auth";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserAuth);

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <View style={styles.container}>
      <ThemedText>Edit app/(tabs)/(profile)/index.tsx to edit this screen.</ThemedText>
      <Link style={{color: "red", marginTop: 16}} href="/login">Login</Link>
      <Link style={{color: "red", marginTop: 16}} href="/register">Register</Link>

      <View style={{marginTop: 64}}>
        <ThemedText>ID: {user?.id}</ThemedText>
        <ThemedText>Username: {user?.username}</ThemedText>
        <ThemedText>Role: {user?.role}</ThemedText>
        <ThemedText>CreatedAt: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''}</ThemedText>
      </View>

      {user && <Button color={'red'} title="Logout" onPress={handleLogout} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
