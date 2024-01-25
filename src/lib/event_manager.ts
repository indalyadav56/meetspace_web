import { addJoinedUser } from "@/redux/features/chatMessage/chatMessageSlice";
import { updateChatRoomContact } from "@/redux/features/chatRoom/chatRoomSlice";

export function handleGlobalEvent(event_data: Object) {
  const message = JSON.parse(event.data);
  console.log("globalSocket:->", message);
  if (message.event_type === "USER_JOINED") {
    dispatch(addJoinedUser(message.data));
  }
  if (
    message.event_type === "NEW_CHAT_MESSAGE" &&
    message.receiverUser.id === currentUserId
  ) {
    dispatch(
      updateChatRoomContact({
        ...message.data.sender,
        room_id: message.data.chat_room.id,
        message_unseen_count: 1,
      })
    );
  }
  if (
    message.event_type === "CHAT_MESSAGE_NOTIFICATION" &&
    message.receiverUser.user_id === currentUserId
  ) {
    alert("Chat message Notification");
  }
}

// useEffect(() => {
//   if (socket) {
//     socket.onmessage = (event) => {
//       // handleUserConnected(event.data);
//     };
//   }
//   // setTimeout(() => {
//   //   if (socket && socket.readyState === 1) {
//   //     socket.send(
//   //       JSON.stringify({
//   //         event_type: "USER_CONNECTED",
//   //         userId: currentUserId,
//   //         is_connected: true,
//   //         message: "user connected successfully",
//   //       })
//   //     );
//   //   }
//   // }, 1000);
// }, [socket]);

const handleUserConnected = (data: any) => {
  try {
    const message = JSON.parse(data);
    if (
      message.event_type === "USER_CONNECTED" &&
      currentUserId != message.userId
    ) {
      dispatch(updateUserState({ userId: message.userId, isActive: true }));
    }
    if (
      message.event_type === "USER_DISCONNECTED" &&
      currentUserId != message.userId
    ) {
      dispatch(updateUserState({ userId: message.userId, isActive: false }));
    }
  } catch (err) {
    console.log(err);
  }
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    if (socket && socket.readyState === 1) {
      socket.send(
        JSON.stringify({
          event_type: "USER_DISCONNECTED",
          userId: currentUserId,
          is_connected: false,
          message: "user connected successfully",
        })
      );
    }
  } else {
    if (socket && socket.readyState === 1) {
      socket.send(
        JSON.stringify({
          event_type: "USER_CONNECTED",
          userId: currentUserId,
          is_connected: true,
          message: "user connected successfully",
        })
      );
    }
  }
};

useEffect(() => {
  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}, []);
