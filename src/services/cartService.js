import { privateApi } from "./axiosInstance";

const cartService = {
  getCarts() {
    return privateApi.get("/cart");
  },
  addNewCart(data) {
    return privateApi.put(`/cart`, data);
  },
  deleteCart(id) {
    return privateApi.delete(`/cart/${id}`);
  },
};
export default cartService;
