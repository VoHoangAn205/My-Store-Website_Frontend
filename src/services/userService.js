import API from "./API";

const userService = {
  register(data) {
    return API.call().post("/register", data);
  },
  login(data) {
    return API.call().post("/auth", data);
  },
  refreshToken() {
    return API.call().get("/refresh");
  },
};

export default userService;
