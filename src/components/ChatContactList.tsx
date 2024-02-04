"use client";

import ChatContactCard from "./ChatContactCard";

interface ChatContactListProps {
  data: ChatContactItem[];
}

const ChatContactList: React.FC<ChatContactListProps> = (props) => {
  const { data } = props;

  // const newChatRoomId = useAppSelector(
  //   (state) => state.chatRoomReducer.chatRoomId
  // );

  const onItemClick = (contact: ChatContactItem) => {
    if (!contact.room_id && contact.id) {
      // dispatch(getSingleChatRoomAsPerUserId(contact.id)).then((response) => {
      //   if (
      //     response.payload.status_code === 200 &&
      //     response.payload.data?.length === 0
      //   ) {
      //     const userData = {
      //       user_id: contact.id,
      //       room_id: newChatRoomId,
      //     };
      //     dispatch(updateChatUserRoomId(userData));
      //   } else {
      //     const userData = {
      //       user_id: contact.user_id,
      //       room_id: response.payload.data
      //         ? response.payload.data[0].chat_room_id
      //         : newChatRoomId,
      //     };
      //     dispatch(updateChatUserRoomId(userData));
      //   }
      // });
    }
    // dispatch(
    //   addSingleChatRoom({
    //     id: contact.room_id ? contact.room_id : newChatRoomId,
    //     room_users: [{ ...contact }],
    //   })
    // );
    // dispatch(
    //   getChatMessages(contact.room_id ? contact.room_id : newChatRoomId)
    // );
  };

  return (
    <div className="h-[calc(100%-48px)] overflow-y-auto">
      {data?.map((item: ChatContactItem, index) => (
        <ChatContactCard
          key={index}
          data={item}
          onUserClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
};

export default ChatContactList;
