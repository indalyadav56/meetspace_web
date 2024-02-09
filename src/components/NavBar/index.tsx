"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoreVertical } from "lucide-react";

import UserAvatar from "../UserAvatar";
import DialogBox from "../DialogBox";
import useUserStore from "@/store/userStore";
import AddGroupForm from "../AddGroupForm";
import ManageAccount from "../ManageAccount";
import UploadProfile from "../UploadProfile";
import { Button } from "../ui/button";
import Menu from "../Menu";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [accountDialog, setAccountDialog] = useState<boolean>(false);
  const [openGroupDialog, setOpenGroupDialog] = useState<boolean>(false);

  const { getUserProfile, success } = useUserStore();

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
      <header className="flex justify-between p-1">
        <UserAvatar
          size="md"
          isOnline={true}
          onClick={() => setAccountDialog(true)}
        />
        <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
          <MoreVertical />
        </Button>
      </header>
      {/* menu */}

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
