import { createSlice } from "@reduxjs/toolkit";
import { createChatMessage, getChatMessages } from "./chatMessageApi";

interface ChatState {
  data: [];
}

const chatMessageSlice = createSlice({
  name: "chatMessage",
  initialState: {
    data: [],
    receiverUserId: "",
    messageUnseenCount: 0,
  },
  reducers: {
    updateMessageUnseenCount: (state, action) => {
      state.messageUnseenCount += action.payload;
    },

    addChatMessageData: (state, action) => {
      if (state.data.length == 0) {
        state.data.push({ timestamp: "Today", chat_message: [action.payload] });
      } else {
        state.data.forEach((element) => {
          if (element.timestamp === "Today") {
            element.chat_message.push(action.payload);
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChatMessage.fulfilled, (state, action) => {
        state.data?.forEach((element) => {
          if (element.timestamp === "Today") {
            element.chat_message.push(action.payload.data);
          }
        });
        if (state.data.length === 0) {
          const data = [
            {
              timestamp: "Today",
              chat_message: [],
            },
          ];
          data[0]["chat_message"].push(action.payload.data);
          state.data = data;
        }
      })
      .addCase(getChatMessages.fulfilled, (state, action) => {
        state.data = [];
        if (action.payload.data) {
          state.data = action.payload.data;
        }
        state.receiverUserId = action.meta.arg;
      });
  },
});

export default chatMessageSlice.reducer;

export const { addChatMessageData, updateMessageUnseenCount } =
  chatMessageSlice.actions;
