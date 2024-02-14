import CookieService from "@/lib/cookies";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = CookieService.getCookie("meetspace_access_token");

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const updateUserApi = async (updateData: any) => {
  const response = await api.patch("/v1/users", updateData);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/v1/users");
  return response.data;
};

export const getSingleUserApi = async (userId: string) => {
  const response = await api.get(`/v1/users/${userId}`);
  return response.data;
};

export const getUserProfileApi = async () => {
  const response = await api.get("/v1/user/profile");
  return response.data;
};

export const searchUsers = async () => {
  const response = await api.get("/v1/users");
  return response.data;
};
