"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

import UserAvatar from "../UserAvatar";
import DialogBox from "../DialogBox";
import useUserStore from "@/store/userStore";
import AddGroupForm from "../AddGroupForm";
import ManageAccount from "../ManageAccount";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Label } from "../ui/label";
import useAuthStore from "@/store/authStore";
import useChatGroupStore from "@/store/chatGroupStore";
import { ChatContact } from "@/types/chat_room";
import useChatRoomStore from "@/store/chatRoomStore";

const NavBar = () => {
  const [accountDialog, setAccountDialog] = useState<boolean>(false);
  const [groupDialog, setGroupDialog] = useState<boolean>(false);
  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);

  const router = useRouter();
  const { currentUser } = useUserStore();
  const { logoutUser, loading, success, actionType } = useAuthStore();
  const { success: chatGroupSuccess, chatGroupData } = useChatGroupStore();
  const { updateContactByRoomId } = useChatRoomStore();

  const handleLogout = () => {
    logoutUser();
  };

  useEffect(() => {
    if (success && actionType === "logout") {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    if (chatGroupSuccess) {
      const groupData: ChatContact = {
        room_id: chatGroupData["id"],
        room_name: chatGroupData["room_name"],
        is_group: true,
        updated_at: new Date().toUTCString(),
      };
      setGroupDialog(false);
      updateContactByRoomId(groupData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatGroupSuccess]);

  return (
    <main className="w-full h-16">
      <ToastContainer />
      <header className="flex justify-between p-2">
        <UserAvatar
          size="md"
          isOnline={currentUser.is_active}
          onClick={() => setAccountDialog(true)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="cursor-pointer w-56"
            align="end"
            forceMount
          >
            <DropdownMenuLabel
              className="font-normal "
              onClick={() => setAccountDialog(true)}
            >
              <div className="flex gap-4 space-y-1">
                <UserAvatar isOnline={currentUser?.is_active} size="sm" />
                <Label className="cursor-pointer flex-1 flex flex-col h-5 w-5">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold eading-none">
                      {currentUser?.first_name + " " + currentUser?.last_name}
                    </h1>
                    <h1 className="text-xs leading-none text-muted-foreground">
                      {currentUser?.email}
                    </h1>
                  </div>
                </Label>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setGroupDialog(true)}>
                Create Group
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAccountDialog(true)}>
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLogoutDialog(true)}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* logout alert */}
      <AlertDialog open={logoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              are you sure you want to logout.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setLogoutDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              {loading ? "wait..." : "Logout"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* add group */}
      <DialogBox
        open={groupDialog}
        handleClose={() => setGroupDialog(false)}
        title="Add Group"
        mainContent={<AddGroupForm />}
      />

      {/* manage account */}
      <ManageAccount
        open={accountDialog}
        handleClose={() => setAccountDialog(false)}
      />
    </main>
  );
};

export default NavBar;
