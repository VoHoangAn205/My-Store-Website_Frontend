import API from "./API";
import { privateApi } from "./axiosInstance";

const orderService = {
  getAllUserOrders() {
    return privateApi.get("/order/getAllParents");
  },
  createOrder(data) {
    return privateApi.post("/order/", data);
  },
};

export default orderService;
