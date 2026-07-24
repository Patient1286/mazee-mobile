import { Text, View } from "react-native";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#111",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 24,
        }}
      >
        Login Screen
      </Text>
    </View>
  );
}
