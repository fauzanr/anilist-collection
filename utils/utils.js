export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export const collectionStorageName = "my-collections";

export const defaultBannerUrl = "/fallback-img.png";

export const collectionNameValidation = (collections = []) => ({
  validate: {
    required: (value) => !!value.trim() || "Collection name is required",
    unique: (value) =>
      !collections.some((coll) => coll.name === value.trim()) ||
      "Collection already exist",
  },
  pattern: {
    value: /^[a-z\d\s]+$/i,
    message: "Special characters is not allowed",
  },
});
