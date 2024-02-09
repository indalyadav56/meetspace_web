import React, { useEffect, useRef } from "react";

import { Input } from "./ui/input";
import useUserStore from "@/store/userStore";
import UserList from "./UserList";
import { Search } from "lucide-react";

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
    <div ref={ref} className="relative flex w-full my-2">
      <div className="bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full ">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8"
              onFocus={() => setIsFocused(true)}
            />
          </div>
        </form>
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
