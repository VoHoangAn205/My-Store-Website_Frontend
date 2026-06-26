import axios from "axios";

const API = {
  call() {
    return axios.create({
      baseURL: "http://localhost:3500",
      withCredentials: true,
    });
  },
  callWithToken(token) {
    return axios.create({
      baseURL: "http://localhost:3500",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export default API;
