import axios, { CreateAxiosDefaults } from "axios";
import { Token } from "./token";

const options: CreateAxiosDefaults = {
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const api = axios.create(options);

api.interceptors.request.use((config) => {
  const accessToken = Token.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { api };
