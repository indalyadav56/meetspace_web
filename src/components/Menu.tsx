import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";
import UserAvatar from "./UserAvatar";
import useAuthStore from "@/store/authStore";
import CookieService from "@/lib/cookies";
import constants from "@/constants";

export default function Menu() {
  const { logoutUser } = useAuthStore();

  const handleLogout = () => {
    logoutUser({
      refresh_token: CookieService.getCookie(constants.token.REFRESH_TOKEN),
    });
    router.push("/login");
  };

  return (
    <div>
      <DropdownMenu open={showUserMenu} onOpenChange={setShowUserMenu}>
        <DropdownMenuTrigger asChild>
          <div className="flex">
            <Button variant="outline" size="icon">
              <MoreVertical />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-sm">
          <div className="flex gap-4">
            <UserAvatar
              imgSrc={userProfilePath}
              isOnline={currentUser?.is_active}
              onClick={() => setOpen(true)}
            />
            <div className="flex-1 flex flex-col">
              <div>
                <h1 className="font-bold">
                  {currentUser?.first_name + " " + currentUser?.last_name}
                </h1>
                <h1>{currentUser?.email}</h1>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />
          <div
            className="mt-2 p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setOpenGroupDialog(true);
            }}
          >
            Create Group
          </div>
          <DropdownMenuSeparator />
          <div
            className="mt-2 p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => setAccountDialog(true)}
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
