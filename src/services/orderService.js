import API from "./API";
import { privateApi } from "./axiosInstance";

const orderService = {
  getAllUserOrders() {
    return privateApi.get("/order/getAllParents");
  },
};

export default orderService;
