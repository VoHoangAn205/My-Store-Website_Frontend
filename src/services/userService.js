import API, { axiosPrivate } from "./API";

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
    return axiosPrivate.get("/user");
  },
  getUserInfoWithToken(token) {
    return API.callWithToken(token).get("/user");
  },
  requestOtpRegister(email) {
    return API.call().post(`/requestOtp`, email);
  },
  upgradeToVendor() {
    return axiosPrivate.put(`/user/upgradeToVendor`);
  },
};

export default userService;
