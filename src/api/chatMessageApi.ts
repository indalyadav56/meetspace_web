import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

interface Message {}

interface CreateMessageData {}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get("meetspace_access_token")}`,
  },
});

export const getChatMessages = async (
  chatRoomId: string
): Promise<AxiosResponse<Message[]>> => {
  return api.get(`/v1/chat/messages/${chatRoomId}`);
};

export const createChatMessage = async (
  data: CreateMessageData
): Promise<AxiosResponse<Message>> => {
  return api.post("/v1/chat/messages", data);
};
