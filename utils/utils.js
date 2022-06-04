export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export const collectionStorageName = "my-collections";

export const defaultBannerUrl = "/fallback-img.png";
