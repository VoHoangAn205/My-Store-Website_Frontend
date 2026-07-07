import API from "./API";

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
  getUserInfo(token) {
    return API.callWithToken(token).get("/user");
  },
};

export default userService;
