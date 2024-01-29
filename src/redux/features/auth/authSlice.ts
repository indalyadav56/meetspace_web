import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./authApi";
import Cookies from "../../../../node_modules/@types/js-cookie";
import CookieService from "@/lib/cookies";
import constants from "@/constants";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: {},
    token: "",
    data: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.error = false;
        state.data = action.payload;
        state.currentUser = action.payload.data;
        if (action.payload.status_code === 200) {
          CookieService.setCookie(
            constants.token.ACCESS_TOKEN,
            action.payload.data.token.access
          );
        }
      })
      .addCase(register.fulfilled, (state, action) => {
        CookieService.setCookie(
          constants.token.ACCESS_TOKEN,
          action.payload.data.token.access
        );
      })
      .addCase(logout.fulfilled, (state, action) => {
        CookieService.removeCookie(constants.token.ACCESS_TOKEN);
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => {
  if (state?.auth?.user) return state.auth.user;

  return null;
};

export const selectCurrentToken = (state: any) => {
  if (state?.auth?.token) return state.auth.token;

  return null;
};
