import { axiosPrivate, axiosPublic } from "./API";
import { router } from "../App";

let accessTokenMemory = null;
let isRefreshing = false;
let failedQueue = [];

export const setAccessToken = (token) => {
  accessTokenMemory = token;
};

const progressQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosPrivate.interceptors.request.use(
  (config) => {
    if (accessTokenMemory && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessTokenMemory}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosPrivate(originalRequest);
          })
          .catch((err) => {
            Promise.reject(err);
          });
      }
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const response = await axiosPublic.post("/refresh");
        const newAccessToken = response.data.accessToken;

        setAccessToken(newAccessToken);
        progressQueue(null, newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        try {
          processQueue(refreshError, null);
        } catch (err) {
          console.error("Queue process failed ", err);
        }

        setAccessToken(null);
        // window.location.href = "/login";
        router.navigate("/login");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
