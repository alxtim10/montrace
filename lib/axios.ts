import { store } from "@/stores/store";
import { setToken } from "@/stores/tokenState";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const axiosInstance = axios.create({
  baseURL: "https://alxtim10.github.io/montrace-backend",
  // baseURL: "http://localhost:2000",
});

export const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (config) => {
    const tokenState = store.getState();
    const { expire }: any = tokenState.tokenField;

    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axiosInstance.post("http://localhost:2000/users/refresh");
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      const decoded: any = jwt_decode(response.data.accessToken);
      store.dispatch(
        setToken({ exp: decoded.exp, name: decoded.name, token: response.data.accessToken })
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
