import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = Cookies.get("meetspace_access_token");

export const getChatMessages = createAsyncThunk(
  "get/chat/messages",
  async (chatRoomId: string) => {
    const response = await fetch(`${base_url}/v1/chat/messages/${chatRoomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const dataRes = await response.json();
    return dataRes;
  }
);

export const createChatMessage = createAsyncThunk(
  "create/chat/messages",
  async (msgData: any) => {
    const response = await fetch(`${base_url}/v1/chat/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(msgData),
    });
    const dataRes = await response.json();
    return dataRes;
  }
);
