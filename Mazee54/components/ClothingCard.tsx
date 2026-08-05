import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  imageUrl: string;
  category?: string;
  color?: string;
  brand?: string;
};

export default function ClothingCard({
  imageUrl,
  category,
  color,
  brand,
}: Props) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />

      <Text style={styles.title}>
        {category || "Unknown Item"}
      </Text>

      <Text style={styles.info}>
        Color: {color || "Unknown"}
      </Text>

      <Text style={styles.info}>
        Brand: {brand || "Unknown"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1C1C1C",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 220,
    backgroundColor: "#333",
  },

  title: {
    color: "#D4AF37",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 12,
  },

  info: {
    color: "#FFF",
    marginHorizontal: 12,
    marginBottom: 10,
  },
});