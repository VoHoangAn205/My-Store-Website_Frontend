import API from "./API";
import { privateApi } from "./axiosInstance";

const productService = {
  getAllProducts() {
    return API.call().get("/product");
  },
  getProductDetail(id) {
    return API.call().get(`/product/${id}`);
  },
  getAllUserProducts(data) {
    return privateApi.get(
      `/product/myOwnProducts?page=${data.currentPage}&limit=5`,
    );
  },
  createProduct(data) {
    return privateApi.post("/product", data);
  },
};

export default productService;
