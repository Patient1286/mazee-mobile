import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  onPress: () => void;
  loading?: boolean;
};

export default function UploadButton({
  onPress,
  loading = false,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
    >
      <Text style={styles.text}>
        {loading ? "Uploading..." : "+ Add Clothing"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D4AF37",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 20,
  },

  text: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "bold",
  },
});