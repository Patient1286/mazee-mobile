import { StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Mazee 👋</Text>
      <Text style={styles.subtitle}>
        You are now logged in.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#D4AF37",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    marginTop: 15,
    fontSize: 18,
  },
});