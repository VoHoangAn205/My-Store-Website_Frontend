import axios from "axios";
import { logout, silentTokenSave } from "../redux/userSlice";

let store;
export const injectStore = (_store) => {
  store = _store;
};

export const privateApi = axios.create({
  baseURL: "http://localhost:3500",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

privateApi.interceptors.request.use(
  (config) => {
    if (store) {
      const token = store.getState().USER.token;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if ((status === 403 || status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("Access token expired. Attemping silent rotation...");

        const response = await axios.post(
          "http://localhost:3500/refresh",
          {},
          { withCredentials: true },
        );

        const { accessToken } = response.data;

        if (store) {
          store.dispatch(silentTokenSave(accessToken));
        }
        privateApi.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return privateApi(originalRequest);
      } catch (refreshError) {
        console.error("RefreshToken is expired or invalid. Evicting session");

        if (store) {
          store.dispatch(logout());
        }
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
