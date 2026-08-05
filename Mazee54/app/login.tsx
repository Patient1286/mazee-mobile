import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLastEmail();
  }, []);

  async function loadLastEmail() {
    const saved = await AsyncStorage.getItem("lastEmail");

    if (saved) {
      setEmail(saved);
    }
  }

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert(
        "Missing Information",
        "Please enter your email and password."
      );
      return;
    }

    setLoading(true);

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setLoading(false);
      Alert.alert("Login Failed", error.message);
      return;
    }

    await AsyncStorage.setItem("lastEmail", email.trim());

    // Check whether profile exists
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user!.id)
      .maybeSingle();

    // Create profile if missing
    if (!profile) {
      const username =
        (user?.user_metadata?.username as string) ??
        email.split("@")[0];

      const { error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: user!.id,
          username,
          email: user!.email,
        });

      if (insertError) {
        console.log(insertError);
      }
    }

    setLoading(false);

    router.replace("/(tabs)");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        autoCapitalize="none"
        keyboardType="email-address"
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

      <Button
        title={loading ? "Signing In..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.link}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
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

  link: {
    color: "#D4AF37",
    textAlign: "center",
    fontSize: 16,
  },
});