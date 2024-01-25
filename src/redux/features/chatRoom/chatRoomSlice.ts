import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createChatRoom,
  getChatRoomContact,
  getSingleChatRoom,
  getSingleChatRoomAsPerUserId,
} from "./chatRoomApi";
import { v4 as uuidv4 } from "uuid";

interface ChatRoomState {
  singleChatRoomData: null;
  chatRoomContact: ChatContactItem[];
  receiverUser: ChatContactItem | null;
  chatRoomId: string;
  joinedUsers: {};
}

const initialState: ChatRoomState = {
  singleChatRoomData: null,
  chatRoomContact: [],
  receiverUser: null,
  chatRoomId: uuidv4(),
  joinedUsers: {},
};

const chatRoomSlice = createSlice({
  name: "chatRoomSlice",
  initialState,
  reducers: {
    addSingleChatRoom: (state, action) => {
      state.singleChatRoomData = action.payload;
    },

    updateChatUserRoomId: (state, action) => {
      const index = state.chatRoomContact.findIndex(
        (user) => user.user_id === action.payload.user_id
      );

      if (index !== -1) {
        state.chatRoomContact[index].room_id = action.payload.room_id;
      }
    },

    updateChatRoomContactIndex: (state, action: PayloadAction<any>) => {
      const index = state.chatRoomContact.findIndex(
        (item) => item.room_id === action.payload.room_id
      );
      state.chatRoomContact.splice(index, 1);
      state.chatRoomContact.splice(0, 0, action.payload);
    },

    updateChatRoomContact: (state, action: PayloadAction<ChatContactItem>) => {
      state.receiverUser = action.payload;

      const contactDataByRoomId = state.chatRoomContact.filter(
        (user) => user.room_id === action.payload.room_id
      );
      const contactDataByUserId = state.chatRoomContact.filter(
        (user) =>
          user.user_id === action.payload.id || user.id === action.payload.id
      );

      if (action.payload.room_id && contactDataByRoomId.length === 0) {
        state.chatRoomContact.unshift(action.payload);
      }

      if (contactDataByUserId.length === 0) {
        state.chatRoomContact.unshift(action.payload);
      } else {
        const currentIndex = state.chatRoomContact.findIndex(
          (item) => item.room_id === action.payload.room_id
        );

        if (
          currentIndex !== -1 &&
          state.chatRoomContact[currentIndex].hasOwnProperty(
            "message_unseen_count"
          )
        ) {
          state.chatRoomContact[currentIndex].message_unseen_count = 0;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createChatRoom.fulfilled, (state, action) => {});
    builder.addCase(getSingleChatRoomAsPerUserId.fulfilled, (state, action) => {
      // if (action.payload.data) {
      //   state.chatRoomContact = action.payload.data;
      // }
    });

    builder.addCase(getChatRoomContact.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.chatRoomContact = action.payload.data;
      }
    });

    builder.addCase(getSingleChatRoom.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.singleChatRoomData = action.payload.data;
      }
    });
  },
});

export default chatRoomSlice.reducer;

export const {
  updateChatUserRoomId,
  updateChatRoomContact,
  addSingleChatRoom,
  updateChatRoomContactIndex,
} = chatRoomSlice.actions;
