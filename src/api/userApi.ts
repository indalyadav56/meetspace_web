import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = Cookies.get("meetspace_access_token");

console.log("token", token);

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const updateUser = async (updateData: any) => {
  const response = await api.patch("/v1/users", updateData);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/v1/users");
  return response.data;
};

export const getSingleUser = async (userId: string) => {
  const response = await api.get(`/v1/users/${userId}`);
  return response.data;
};

export const searchUsers = async () => {
  const response = await api.get("/v1/users");
  return response.data;
};
