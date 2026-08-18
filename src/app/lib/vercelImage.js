import { put, del } from "@vercel/blob";

export async function uploadImage(file) {
  if (!file || file.size === 0) {
    throw new Error("No file provided");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  const blob = await put(
    `products/${Date.now()}-${file.name}`,
    file,
    {
      access: "public",
    }
  );

  return blob;
}

export async function deleteImage(url) {
  await del(url);
}