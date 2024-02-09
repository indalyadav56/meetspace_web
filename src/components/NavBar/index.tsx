"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoreVertical } from "lucide-react";

import UserAvatar from "../UserAvatar";
import DialogBox from "../DialogBox";
import useUserStore from "@/store/userStore";
import AddGroupForm from "../AddGroupForm";
import ManageAccount from "../ManageAccount";
import UploadProfile from "../UploadProfile";
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

const NavBar = () => {
  const [accountDialog, setAccountDialog] = useState<boolean>(false);
  const [groupDialog, setGroupDialog] = useState<boolean>(false);
  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);

  const { getUserProfile, currentUser } = useUserStore();

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-full h-16">
      <ToastContainer />
      <header className="flex justify-between p-2">
        <UserAvatar
          size="md"
          isOnline={true}
          onClick={() => setAccountDialog(true)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onClick={() => setAccountDialog(true)}
            className="cursor-pointer w-56"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex gap-4 space-y-1">
                <UserAvatar isOnline={currentUser?.is_active} size="sm" />
                <div className="flex-1 flex flex-col">
                  <div>
                    <h1 className="font-bold eading-none">
                      {currentUser?.first_name + " " + currentUser?.last_name}
                    </h1>
                    <h1 className="text-xs leading-none text-muted-foreground">
                      {currentUser?.email}
                    </h1>
                  </div>
                </div>
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
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setLogoutDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setLogoutDialog(false)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* upload profile */}
      <UploadProfile />

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
