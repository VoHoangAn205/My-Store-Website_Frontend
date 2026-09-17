import { axiosPrivate } from "./API";

const orderService = {
  getAllUserOrders() {
    return axiosPrivate.get("/order/getAllParents");
  },
  getOrdersForShop(data) {
    return axiosPrivate.get(
      `/order/getShopOrders?limit=${data.limit}&page=${data.page}&status=${data.status}`,
    );
  },
  createOrder(data) {
    return axiosPrivate.post("/order/", data);
  },
  shopUpdateOrderStatus(id) {
    return axiosPrivate.put(`/order/shopUpdateStatus/${id}`);
  },
  shopCancelOrder(id) {
    return axiosPrivate.put(`/order/shopCancel/${id}`);
  },
};

export default orderService;
