import API from "./API";
import { privateApi } from "./axiosInstance";

const orderService = {
  getAllUserOrders() {
    return privateApi.get("/order/getAllParents");
  },
  getOrdersForShop(data) {
    return privateApi.get(
      `/order/getShopOrders?limit=${data.limit}&page=${data.page}&status=${data.status}`,
    );
  },
  createOrder(data) {
    return privateApi.post("/order/", data);
  },
  shopUpdateOrderStatus(id) {
    return privateApi.put(`/order/shopUpdateStatus/${id}`);
  },
  shopCancelOrder(id) {
    return privateApi.put(`/order/shopCancel/${id}`);
  },
};

export default orderService;
