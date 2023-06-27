import axios from "axios";

const baseURL = "http://localhost:3000" + "/api/";
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

export default api;
