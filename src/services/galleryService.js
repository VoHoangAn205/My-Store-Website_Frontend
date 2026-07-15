import { privateApi } from "./axiosInstance";

const galleryService = {
  uploadGallery(formData) {
    return privateApi.post("/gallery", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export default galleryService;
