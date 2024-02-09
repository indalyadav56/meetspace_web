"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bell, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserAvatar from "../UserAvatar";
import DialogBox from "../DialogBox";

import useUserStore from "@/store/userStore";
import AddGroupForm from "../AddGroupForm";
import ManageAccount from "../ManageAccount";
import UploadProfile from "../UploadProfile";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [accountDialog, setAccountDialog] = useState<boolean>(false);
  const [openGroupDialog, setOpenGroupDialog] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { currentUser, getUserProfile, success } = useUserStore();
  const router = useRouter();

  const userProfilePath =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    "/uploads/" +
    currentUser?.id +
    "/profile/" +
    currentUser?.profile_pic?.temp_name;

  useEffect(() => {
    if (success) {
      setOpen(false);
    }
  }, [success]);

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-full h-16">
      <ToastContainer />
      <header className="flex justify-between">
        <UserAvatar
          size="md"
          isOnline={true}
          imgSrc={userProfilePath}
          onClick={() => setAccountDialog(true)}
        />
      </header>
      {/* menu */}
      {/* <Menu /> */}

      {/* upload profile */}
      <UploadProfile />

      {/* add group */}
      <DialogBox
        open={openGroupDialog}
        handleClose={() => setOpenGroupDialog(false)}
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
