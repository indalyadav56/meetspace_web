import React, { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import UserList from "./ChatContactList";

const SearchContainer: React.FC = () => {
  const dispatch = null;
  const ref = useRef(null);

  const [isFocused, setIsFocused] = React.useState(false);
  const usersData = null;

  useEffect(() => {
    // dispatch(searchUser());
  }, [isFocused]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  // const onUserClick = () => {
  //   dispatch(
  //     createChatRoom({
  //       room_users: [user.id],
  //     })
  //   );
  //   setIsFocused(false);
  // };

  return (
    <div ref={ref} className="flex w-full p-2 my-8">
      <Input onFocus={() => setIsFocused(true)} className="h-12" />
      {isFocused && (
        <div className="absolute w-2/4 max-h-80 mt-2 bg-gray-400 rounded-sm z-50 overflow-y-auto">
          <UserList data={usersData} />
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
