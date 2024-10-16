import { View, StyleSheet, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react'
import { ThemedText } from "@/components/ThemedText";
import { Loading } from "@/components/Loading";
import { Link } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectError, selectStatus } from "@/store/auth";
import { login } from "@/store/authThunks";


export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(login({ username, password }));
  }

  useEffect(() => {
    if (status === 'succeeded') {
      router.replace('/(profile)');
    }
  }, [status]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Login</ThemedText>
      {status === "failed" && <ThemedText style={{color: "red"}}>{error ? error : 'Unknown Error'}</ThemedText>}
      <View>
        <ThemedText>Username</ThemedText>
        <TextInput style={styles.input} onChangeText={setUsername} placeholder="Username" textContentType="username" />
      </View>
      <View>
        <ThemedText>Password</ThemedText>
        <TextInput style={styles.input} onChangeText={setPassword} placeholder="Password" textContentType="password" secureTextEntry />
      </View>
      <Button title="Login" onPress={handleLogin} />
      <Link style={{color: "red", marginTop: 16}} href="/register">Register</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: "grey",
    color: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 32,
  }
});
