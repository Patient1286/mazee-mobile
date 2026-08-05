import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { supabase } from "./supabase";

export async function uploadClothingImage(
  userId: string,
  imageUri: string
) {
  // Resize image before upload
  const manipulated = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 1200 } }],
    {
      compress: 0.8,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );

  // Read image as base64
  const base64 = await FileSystem.readAsStringAsync(manipulated.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const fileName = `${userId}/${Date.now()}.jpg`;

  const { error } = await supabase.storage
    .from("wardrobe")
    .upload(fileName, decode(base64), {
      contentType: "image/jpeg",
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("wardrobe")
    .getPublicUrl(fileName);

  return data.publicUrl;
}