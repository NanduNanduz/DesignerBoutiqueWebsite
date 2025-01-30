import axios from "axios";

// for each req injecting token for that created axiosInstance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
//attach that token in the req - header
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("logintoken");
    if (accessToken) {
      if (config) {
        config.headers.token = accessToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
//all axios req is replace with axiosInstance
