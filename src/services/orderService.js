import API from "./API";
import { privateApi } from "./axiosInstance";

const orderService = {
  getAllUserOrders() {
    return privateApi.get("/order/getAllParents");
  },
  getOrdersForShop(data) {
    return privateApi.get(
      `/order/getShopOrders?limit=${data.limit}&page=${data.page}`,
    );
  },
  createOrder(data) {
    return privateApi.post("/order/", data);
  },
};

export default orderService;
