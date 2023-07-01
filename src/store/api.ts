import axios from "axios";

const baseURL = "/api/";
const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("user_token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("user_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
