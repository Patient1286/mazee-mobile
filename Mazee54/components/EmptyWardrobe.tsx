import { StyleSheet, Text, View } from "react-native";

export default function EmptyWardrobe() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>👕</Text>

      <Text style={styles.title}>
        Your wardrobe is empty
      </Text>

      <Text style={styles.subtitle}>
        Tap "Add Clothing" to start building your wardrobe.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 30,
  },

  icon: {
    fontSize: 60,
    marginBottom: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    color: "#999999",
    textAlign: "center",
    fontSize: 16,
  },
});