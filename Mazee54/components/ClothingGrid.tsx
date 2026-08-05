import { FlatList } from "react-native";
import ClothingCard from "./ClothingCard";

type ClothingItem = {
  id: string;
  image_url: string;
  category?: string;
  color?: string;
  brand?: string;
};

type Props = {
  items: ClothingItem[];
};

export default function ClothingGrid({ items }: Props) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 100 }}
      renderItem={({ item }) => (
        <ClothingCard
          imageUrl={item.image_url}
          category={item.category}
          color={item.color}
          brand={item.brand}
        />
      )}
    />
  );
}