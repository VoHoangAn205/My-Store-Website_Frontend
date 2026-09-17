import { axiosPrivate } from "./API";

const galleryService = {
  uploadGallery(formData) {
    return axiosPrivate.post("/gallery", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export default galleryService;
