import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Missing Information", "Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Create authentication account only
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          username: username.trim(),
        },
      },
    });

    setLoading(false);

    if (error) {
      Alert.alert("Signup Failed", error.message);
      return;
    }

    Alert.alert(
      "Account Created",
      "Your account has been created successfully. Please log in.",
      [
        {
          text: "OK",
          onPress: () => router.replace("/login"),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button
        title={loading ? "Creating Account..." : "Create Account"}
        onPress={handleSignup}
        disabled={loading}
      />

      <View style={{ height: 20 }} />

      <Button
        title="Already have an account?"
        onPress={() => router.replace("/login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    color: "#D4AF37",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#222222",
    color: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    fontSize: 16,
  },
});