import API from "./API";
import { privateApi } from "./axiosInstance";

const userService = {
  register(data) {
    return API.call().post("/register", data);
  },
  login(data) {
    return API.call().post("/auth", data);
  },
  logout() {
    return API.call().post("/logout");
  },
  refreshToken() {
    return API.call().post("/refresh");
  },
  getUserInfo() {
    return privateApi.get("/user");
  },
  requestOtpRegister(email) {
    return API.call().post(`/requestOtp`, email);
  },
  upgradeToVendor() {
    return privateApi.put(`/user/upgradeToVendor`);
  },
};

export default userService;
