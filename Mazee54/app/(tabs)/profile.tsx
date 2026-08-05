import { router } from "expo-router";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function ProfileScreen() {
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Logout Failed", error.message);
      return;
    }

    router.replace("/onboarding");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text style={styles.subtitle}>
        Welcome to your Mazee profile.
      </Text>

      <View style={{ height: 30 }} />

      <Button
        title="Logout"
        color="#d9534f"
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  title: {
    color: "#D4AF37",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});