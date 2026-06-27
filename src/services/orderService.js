import API from "./API";

const orderService = {
  getAllUserOrders(token) {
    return API.callWithToken(token).get("/order/getAllParents");
  },
};

export default orderService;
