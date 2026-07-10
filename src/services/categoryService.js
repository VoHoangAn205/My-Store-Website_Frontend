import API from "./API";

const categoryService = {
  getAllCategories() {
    return API.call().get("/category");
  },
};

export default categoryService;
