import React, { useEffect, useRef } from "react";

import { Input } from "./ui/input";
import useUserStore from "@/store/userStore";
import UserList from "./UserList";

const SearchContainer: React.FC = () => {
  const [isFocused, setIsFocused] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { users } = useUserStore();

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  return (
    <div ref={ref} className="relative flex w-full my-4">
      <div className="w-full p-2">
        <Input onFocus={() => setIsFocused(true)} className="h-12" />
      </div>
      {isFocused && (
        <div className="absolute w-full max-h-96 mt-16 rounded-sm z-50 overflow-y-auto overflow-x-hidden">
          <UserList data={users} setIsFocused={setIsFocused} />
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
