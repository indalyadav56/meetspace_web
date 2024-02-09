import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

import UserAvatar from "./UserAvatar";
import useAuthStore from "@/store/authStore";
import CookieService from "@/lib/cookies";
import constants from "@/constants";

export default function Menu({ open }: { open: boolean }) {
  const { logoutUser } = useAuthStore();

  const handleLogout = () => {
    logoutUser({
      refresh_token: CookieService.getCookie(constants.token.REFRESH_TOKEN),
    });
    // router.push("/login");
  };

  return (
    <div>
      <DropdownMenu open={true}>
        <DropdownMenuContent className="text-sm">
          <div className="flex gap-4">
            <UserAvatar
            // imgSrc={userProfilePath}
            // isOnline={currentUser?.is_active}
            // onClick={() => setOpen(true)}
            />
            <div className="flex-1 flex flex-col">
              {/* <div>
                <h1 className="font-bold">
                  {currentUser?.first_name + " " + currentUser?.last_name}
                </h1>
                <h1>{currentUser?.email}</h1>
              </div> */}
            </div>
          </div>
          <DropdownMenuSeparator />
          <div
            className="mt-2 p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              // setOpenGroupDialog(true);
            }}
          >
            Create Group
          </div>
          <DropdownMenuSeparator />
          <div
            className="mt-2 p-2 hover:bg-gray-100 cursor-pointer"
            // onClick={() => setAccountDialog(true)}
          >
            Manage Account
          </div>
          <DropdownMenuSeparator />
          <div
            className="p-2  hover:bg-gray-100 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
