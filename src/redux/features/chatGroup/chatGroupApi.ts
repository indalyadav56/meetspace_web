import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface ChatGRoupData {
  group_name: string;
}

const base_url = process.env.NEXT_PUBLIC_CHAT_API_BASE_URL;
const token = Cookies.get("token");

export const createChatGroup = createAsyncThunk(
  "create/chat/group",
  async (data: ChatGRoupData) => {
    const response = await fetch(`${base_url}/v1/chat/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return dataRes;
  }
);

export const getChatGroupMember = createAsyncThunk(
  "getChatGroupMember",
  async (roomId: string) => {
    const response = await fetch(
      `${base_url}/v1/chat/group/members/${roomId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const dataRes = await response.json();
    return dataRes;
  }
);
