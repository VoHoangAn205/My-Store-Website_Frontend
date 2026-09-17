import { axiosPrivate } from "./API";

const cartService = {
  getCarts() {
    return axiosPrivate.get("/cart");
  },
  updateCart(data) {
    return axiosPrivate.put(`/cart`, data);
  },
  deleteCart(id) {
    return axiosPrivate.delete(`/cart/${id}`);
  },
};
export default cartService;
