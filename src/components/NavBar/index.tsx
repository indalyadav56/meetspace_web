"use client";

import React, { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "../ui/button";
import UserAvatar from "../UserAvatar";
import DialogBox from "../DialogBox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CookieService from "@/lib/cookies";
import constants from "@/constants";
import useAuthStore from "@/store/authStore";
import useUserStore from "@/store/userStore";
import AddGroupForm from "../AddGroupForm";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const { currentUser, getUserProfile, updateUser, success } = useUserStore();
  const { logoutUser } = useAuthStore();
  const router = useRouter();
  const fileRef = useRef();

  const userProfilePath =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    "/uploads/" +
    currentUser?.id +
    "/profile/" +
    currentUser?.profile_pic?.temp_name;

  const notify = (msg: string) => toast(msg);

  const handleLogout = () => {
    logoutUser({
      refresh_token: CookieService.getCookie(constants.token.REFRESH_TOKEN),
    });
    router.push("/login");
  };

  const handleFileUpload = () => {
    fileRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    // Generate a preview for image files
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
    setSelectedFile(file);
  };

  // useEffect(() => {
  //   const accessToken = CookieService.getCookie(constants.token.ACCESS_TOKEN);
  //   if (accessToken) {
  //     const decoded = jwtDecode(accessToken);
  //     if (decoded?.user_id) {
  //       // dispatch(getSingleUser(decoded?.user_id));
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleUploadProfile = () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("profile_pic", selectedFile);
      updateUser(formData);
      // dispatch(updateUser(formData)).then((response) => {
      //   if (response.payload.status_code === 200) {
      //     // SHOW TOASTS
      //   }
      //   setOpen(false);
      // });
    }
  };

  useEffect(() => {
    console.log("uploadProfile", success);
    if (success) {
      setOpen(false);
    }
  }, [success]);

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-full h-16 p-4">
      <ToastContainer />
      <nav className="">
        <div className="flex gap-1 justify-between">
          <UserAvatar size="md" isOnline={true} imgSrc={userProfilePath} />
          <div>
            {/* menu */}
            <DropdownMenu open={showUserMenu} onOpenChange={setShowUserMenu}>
              <DropdownMenuTrigger asChild>
                <div>
                  <Button size="icon">
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
                <div className="mt-2 p-2 hover:bg-gray-100 cursor-pointer">
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

            {/* upload profile */}

            <DialogBox
              open={open}
              title="Change your profile picture"
              handleClose={() => {
                setShowUserMenu(false);
                setOpen(false);
              }}
              mainContent={
                <div className="flex items-center">
                  <div className="flex-1 flex flex-col gap-4">
                    <input
                      type="file"
                      hidden
                      ref={fileRef}
                      onChange={handleFileInputChange}
                      accept=".jpg,.jpeg,.png"
                    />
                    <Button variant="outline" onClick={handleFileUpload}>
                      Upload File
                    </Button>
                    <Button variant="outline">Remove picture</Button>
                  </div>
                  <div className="flex-1 flex justify-center items-center">
                    {imagePreview ? (
                      <UserAvatar imgSrc={imagePreview} size="xl" />
                    ) : (
                      <UserAvatar imgSrc={userProfilePath} size="xl" />
                    )}
                  </div>
                </div>
              }
              footerContent={
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowUserMenu(false);
                      setOpen(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button onClick={handleUploadProfile}>Save</Button>
                </div>
              }
            />

            {/* add group */}
            <DialogBox
              open={openGroupDialog}
              handleClose={() => setOpenGroupDialog(false)}
              title="Add Group"
              mainContent={<AddGroupForm />}
            />
          </div>
        </div>
      </nav>
    </main>
  );
};

export default NavBar;
