import { supabase } from "../lib/supabase";

export type ClothingItem = {
  id: string;
  user_id: string;
  image_url: string;
  category: string | null;
  color: string | null;
  brand: string | null;
  season: string | null;
  notes: string | null;
  created_at: string;
};

export async function getWardrobe() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user.");
  }

  const { data, error } = await supabase
    .from("clothing_items")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as ClothingItem[];
}

export async function createClothingItem(
  imageUrl: string,
  category: string | null = null,
  color: string | null = null,
  brand: string | null = null,
  season: string | null = null,
  notes: string | null = null
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user.");
  }

  const { data, error } = await supabase
    .from("clothing_items")
    .insert({
      user_id: user.id,
      image_url: imageUrl,
      category,
      color,
      brand,
      season,
      notes,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as ClothingItem;
}

export async function deleteClothingItem(id: string) {
  const { error } = await supabase
    .from("clothing_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}