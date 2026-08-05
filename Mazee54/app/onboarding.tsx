import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>M</Text>

      <Text style={styles.title}>MAZEE</Text>

      <Text style={styles.subtitle}>
        Your Personal AI Stylist
      </Text>

      <Text style={styles.description}>
        Style starts with what you have.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/login")}
      >
        <Text style={styles.login}>
          Already have an account? Log In
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
    alignItems: "center",
    paddingHorizontal: 30,
  },

  logo: {
    fontSize: 90,
    color: "#D4AF37",
    fontWeight: "900",
    marginBottom: 30,
  },

  title: {
    fontSize: 42,
    color: "#FFFFFF",
    fontWeight: "bold",
    letterSpacing: 4,
  },

  subtitle: {
    color: "#D4AF37",
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
  },

  description: {
    color: "#CCCCCC",
    fontSize: 16,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 60,
  },

  button: {
    backgroundColor: "#D4AF37",
    width: "100%",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "bold",
  },

  login: {
    color: "#FFFFFF",
    marginTop: 30,
    fontSize: 16,
  },
});