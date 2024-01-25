import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getSingleUser, searchUser, updateUser } from "./userApi";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
    roomUsers: [],
    currentUser: {},
    updateUserResponse: {},
  },
  reducers: {
    addChatRoomData: (state, action: PayloadAction<any>) => {
      state.users.push(action.payload);
    },
    updateUserState: (state, action: PayloadAction<any>) => {
      state.users = state.users.map((user: any) => {
        const updatedRoomUsers = user.room_users.map((roomUser: any) => {
          if (roomUser.id === action.payload.userId) {
            return {
              ...roomUser,
              is_active: action.payload.isActive,
            };
          }
          return roomUser;
        });

        return {
          ...user,
          room_users: updatedRoomUsers,
        };
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserResponse = action.payload.data;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.data;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.users = action.payload.data;
      });
  },
});

export const { addChatRoomData, updateUserState } = userSlice.actions;

export default userSlice.reducer;
