import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = Cookies.get("meetspace_access_token");

export const createChatRoom = createAsyncThunk(
  "createChatRoom",
  async (createRoomData: any) => {
    const response = await fetch(`${base_url}/v1/chat/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(createRoomData),
    });
    const dataRes = await response.json();
    return dataRes;
  }
);

export const getChatRooms = createAsyncThunk("getChatRooms", async () => {
  const response = await fetch(`${base_url}/v1/chat/rooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const dataRes = await response.json();
  return dataRes;
});

export const getSingleChatRoomAsPerUserId = createAsyncThunk(
  "getSingleChatRoomAsPerUserId",
  async (user_id: string) => {
    const response = await fetch(
      `${base_url}/v1/chat/rooms?user_id=${user_id}`,
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

export const getSingleChatRoom = createAsyncThunk(
  "getSingleChatRoom",
  async (roomId: string) => {
    const response = await fetch(`${base_url}/v1/chat/rooms/${roomId}`, {
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

export const getChatRoomContact = createAsyncThunk(
  "getChatRoomContact",
  async () => {
    const response = await fetch(`${base_url}/v1/chat/room/contact`, {
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
