import { login } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const { mutate, isSuccess, isError } = useMutation({
    mutationKey: ["LoginAsAUser"],
    mutationFn: () => login(username, password),
    onSuccess: () => {
      setIsAuthenticated(true);
      router.replace("/home");
      console.log("logged in successfully as: ", username);
    },
  });

  if (isSuccess) return <Text>Successfully Login...</Text>;
  if (isError) return <Text>Error</Text>;

  const handleLogin = () => {
    // console.log("handling Login --> ", handleLogin);

    mutate();
    // console.log("mutate --> ", mutate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text style={styles.title}>Login</Text>
      </TouchableOpacity>
      <View>
        <Text>Do not have account?</Text>
        <Button title="Register" onPress={() => router.push("/Register")} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 34,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    margin: 10,
  },
  btn: {
    borderWidth: 1,
    borderColor: "#000",
    marginHorizontal: 10,
    backgroundColor: "#d1d1d1",
  },
});
