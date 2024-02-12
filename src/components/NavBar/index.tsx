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

const NavBar = () => {
  const [accountDialog, setAccountDialog] = useState<boolean>(false);
  const [groupDialog, setGroupDialog] = useState<boolean>(false);
  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);

  const router = useRouter();
  const { getUserProfile, currentUser } = useUserStore();
  const { logoutUser } = useAuthStore();

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    router.push("/login");
    logoutUser();
  };

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
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
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
