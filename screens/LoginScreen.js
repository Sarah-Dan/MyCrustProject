import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";

const LoginScreen = ({ navigation }) => {
  const { setUser } = useUser();

  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!usernameInput || !password) {
      setError("Please enter both username and password!");
      return;
    }

    // Set the username in the context
    setUser({ username: usernameInput });
    // Provide feedback to the user if the login is successful
    Alert.alert(
      "Success",
      "Login successful.",
      [
        {
          text: "OK",
          onPress: () => {
            // Navigate to the TaskManager screen
            navigation.navigate("TaskManager");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputBox}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="brown"
          value={usernameInput}
          onChangeText={setUsernameInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="brown"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fffaf6",
  },

  inputBox: {
    width: "80%",
  },
  input: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: "#702F02",
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    marginTop: 32,
    gap: 20,
  },
  loginButton: {
    padding: 12,
    backgroundColor: "#702F02",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "silver",
    borderWidth: 1,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});
