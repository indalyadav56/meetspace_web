import { createSlice } from "@reduxjs/toolkit";
import { createChatGroup, getChatGroupMember } from "./chatGroupApi";

const chatGroupSlice = createSlice({
  name: "chatGroup",
  initialState: {
    data: [],
    groupMembers: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createChatGroup.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(getChatGroupMember.fulfilled, (state, action) => {
      state.groupMembers = action.payload.data;
    });
  },
});

export default chatGroupSlice.reducer;
