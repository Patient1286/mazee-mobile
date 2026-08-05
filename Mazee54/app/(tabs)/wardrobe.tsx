import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
} from "react-native";

import ClothingGrid from "../../components/ClothingGrid";
import EmptyWardrobe from "../../components/EmptyWardrobe";
import UploadButton from "../../components/UploadButton";
import { supabase } from "../../lib/supabase";

type ClothingItem = {
  id: string;
  image_url: string;
  category: string | null;
  color: string | null;
  brand: string | null;
};

export default function WardrobeScreen() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadWardrobe() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("clothing_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error.message);
      setItems([]);
    } else {
      setItems(data ?? []);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadWardrobe();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <UploadButton
        onPress={() => {
          console.log("Upload screen coming next...");
        }}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#D4AF37"
          style={{ marginTop: 40 }}
        />
      ) : items.length === 0 ? (
        <EmptyWardrobe />
      ) : (
        <ClothingGrid items={items} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    padding: 20,
  },
});