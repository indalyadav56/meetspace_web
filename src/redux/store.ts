import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/auth/authSlice";
import userReducer from "@/redux/features/user/userSlice";
import chatMessageReducer from "@/redux/features/chatMessage/chatMessageSlice";
import chatRoomReducer from "@/redux/features/chatRoom/chatRoomSlice";
import chatGroupReducer from "@/redux/features/chatGroup/chatGroupSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    chatMessageReducer,
    chatRoomReducer,
    chatGroupReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
