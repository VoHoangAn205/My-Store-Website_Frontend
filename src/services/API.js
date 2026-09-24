import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const API = {
  call() {
    return axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
    });
  },
  callWithToken(token) {
    return axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export default API;
