import axios, { AxiosResponse } from "axios";
import CookieService from "@/lib/cookies";
import constants from "@/constants";

interface ChatGroupData {
  group_name: string;
}

interface ChatGroupMember {}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("baseURL", baseURL);
const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${CookieService.getCookie(
      constants.token.ACCESS_TOKEN
    )}`,
  },
});

export const createChatGroupApi = async (
  data: AddChatGroup
): Promise<AxiosResponse> => {
  return api.post("/v1/chat/groups", data);
};

export const getChatGroupMembers = async (
  roomId: string
): Promise<AxiosResponse<ChatGroupMember[]>> => {
  return api.get(`/v1/chat/group/members/${roomId}`);
};
