import API from "./API";
import { privateApi } from "./axiosInstance";

const productService = {
  getAllUserProducts(data) {
    return privateApi.get("/product/myOwnProducts?page=1&limit=5");
  },
};

export default productService;
