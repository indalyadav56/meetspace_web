import CookieService from "@/lib/cookies";
import constatns from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

interface PostData {
  username: string;
  password: string;
}

interface RegisterBodyData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
interface LogoutBodyData {
  token: string;
}

export const login = createAsyncThunk("v1/auth/login", async (data: any) => {
  const response = await fetch(`${base_url}/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataRes = await response.json();
  return dataRes;
});

export const register = createAsyncThunk(
  "v1/auth/register",
  async (data: RegisterBodyData) => {
    const response = await fetch(`${base_url}/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return dataRes;
  }
);

export const logout = createAsyncThunk(
  "v1/auth/logout",
  async (data: LogoutBodyData) => {
    const response = await fetch(`${base_url}/v1/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + CookieService.getCookie(constatns.token.ACCESS_TOKEN),
      },
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return dataRes;
  }
);
