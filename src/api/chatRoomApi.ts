import axios, { AxiosResponse } from "axios";
import Cookies from "../../node_modules/@types/js-cookie";

interface CreateRoomData {}

interface ChatRoom {}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${Cookies.get("meetspace_access_token")}`,
  },
});

export const createChatRoom = async (
  createRoomData: CreateRoomData
): Promise<AxiosResponse<ChatRoom>> => {
  const response = await api.post("/v1/chat/rooms", createRoomData);
  return response;
};

export const getChatRooms = async (): Promise<AxiosResponse<ChatRoom[]>> => {
  const response = await api.get("/v1/chat/rooms");
  return response;
};

export const getSingleChatRoom = async (
  roomId: string
): Promise<AxiosResponse<ChatRoom>> => {
  const response = await api.get(`/v1/chat/rooms/${roomId}`);
  return response;
};

export const getChatRoomContact = async (): Promise<AxiosResponse<any>> => {
  const response = await api.get(`/v1/chat/room/contact`);
  return response.data;
};
