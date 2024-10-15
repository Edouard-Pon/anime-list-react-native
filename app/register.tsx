import { View, StyleSheet, TextInput, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectError, selectStatus } from "@/store/auth";
import { register } from "@/store/authThunks";
import { Loading } from "@/components/Loading";


export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    dispatch(register({ username, password }));
  }

  useEffect(() => {
    if (status === 'succeeded') {
      router.navigate('/(profile)');
    }
  }, [status]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Register</ThemedText>
      {status === "failed" && <ThemedText style={{color: "red"}}>{error ? error : 'Unknown Error'}</ThemedText>}
      <View>
        <ThemedText>Username</ThemedText>
        <TextInput style={styles.input} onChangeText={setUsername} placeholder="Username" />
      </View>
      <View>
        <ThemedText>Password</ThemedText>
        <TextInput style={styles.input} onChangeText={setPassword} placeholder="Password" textContentType="password" secureTextEntry />
      </View>
      <Button title="Register" onPress={handleRegister} />
      <Link style={{color: "red", marginTop: 16}} href="/login">Login</Link>
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
  },
});
