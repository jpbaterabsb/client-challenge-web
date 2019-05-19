import axios from "axios";
import { authenticationService } from "./";

const api = axios.create({
  baseURL: "http://localhost:8080/"
});

api.interceptors.request.use(async config => {
  const token = authenticationService.currentUserValue.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;