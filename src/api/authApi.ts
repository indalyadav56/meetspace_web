import axios, { AxiosResponse } from "axios";
import CookieService from "@/lib/cookies";
import constants from "@/constants";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface LogoutData {
  token: string;
}

const api = axios.create({
  baseURL,
});

api.interceptors.response.use((resp) => {
  console.log("interception response received", resp);
  return resp;
});

export const login = async (data: LoginData): Promise<AxiosResponse> => {
  return api.post("/v1/auth/login", data);
};

export const register = (data: RegisterData) => {
  return api.post("/v1/auth/register", data);
};

export const logout = async (data: LogoutData): Promise<AxiosResponse> => {
  const token = CookieService.getCookie("meetspace_access_token");
  return api.post("/v1/auth/logout", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
