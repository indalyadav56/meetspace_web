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

export const login = async (data: LoginData): Promise<AxiosResponse> => {
  return api.post("/v1/auth/login", data);
};

export const register = async (data: RegisterData) => {
  const response = await fetch(`${baseURL}/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataRes = await response.json();
  return dataRes;
};

export const logout = async (data: LogoutData): Promise<AxiosResponse> => {
  api.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${CookieService.getCookie(constants.token.ACCESS_TOKEN)}`;

  return api.post("/v1/auth/logout", data);
};
