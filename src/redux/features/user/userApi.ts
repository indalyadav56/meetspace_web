import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = Cookies.get("meetspace_access_token");

export const updateUser = createAsyncThunk(
  "updateUser",
  async (updateData: FormData) => {
    const response = await fetch(`${baseUrl}/v1/users`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: updateData,
    });
    const dataRes = await response.json();
    return dataRes;
  }
);

export const getAllUser = createAsyncThunk("getAllUser", async () => {
  const response = await fetch(`${baseUrl}/v1/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const dataRes = await response.json();
  return dataRes;
});

export const getSingleUser = createAsyncThunk(
  "getSingleUser",
  async (user_id: string) => {
    const response = await fetch(`${baseUrl}/v1/users/${user_id}`, {
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

export const searchUser = createAsyncThunk("searchUser", async () => {
  const response = await fetch(`${baseUrl}/v1/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const dataRes = await response.json();
  return dataRes;
});
