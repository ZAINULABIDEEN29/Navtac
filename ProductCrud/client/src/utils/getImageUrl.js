export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith("http") || imagePath.startsWith("blob:") || imagePath.startsWith("data:")) {
    return imagePath;
  }
  const baseUrl = import.meta.env.VITE_BACKEND_URL.replace("/api/v1", "");
  return `${baseUrl}/uploads/${imagePath}`;
};
