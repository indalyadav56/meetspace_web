"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import SearchUser from "../SearchUser";
import UserAvatar from "../UserAvatar";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHook";
import { logout } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { getSingleUser, updateUser } from "@/redux/features/user/userApi";
import DialogBox from "../DialogBox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CookieService from "@/lib/cookies";
import constants from "@/constants";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const currentUser = useAppSelector((state) => state.userReducer.currentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const fileRef = useRef();

  const userProfilePath =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    "/uploads/" +
    currentUser?.id +
    "/profile/" +
    currentUser?.profile_pic?.temp_name;

  const handleLogout = () => {
    CookieService.removeCookie(constants.token.ACCESS_TOKEN);
    dispatch(logout({ token: "aweraer" })).then(() => {
      router.push("/login");
    });
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

  useEffect(() => {
    const accessToken = CookieService.getCookie(constants.token.ACCESS_TOKEN);
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      if (decoded?.user_id) {
        dispatch(getSingleUser(decoded?.user_id));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUploadProfile = () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("profile_pic", selectedFile);
      dispatch(updateUser(formData)).then((response) => {
        if (response.payload.status_code === 200) {
          // SHOW TOASTS
        }
        setOpen(false);
      });
    }
  };

  return (
    <nav className="h-12 w-full flex items-center justify-between bg-red-400 pl-4 pr-4">
      <h1 className="text-white text-xl font-bold">MeetSpace</h1>
      <div className="w-2/4">
        <SearchUser />
      </div>
      <div className="flex gap-1 items-center">
        <div>
          {/* menu */}
          <DropdownMenu open={showUserMenu} onOpenChange={setShowUserMenu}>
            <DropdownMenuTrigger asChild>
              <div>
                <UserAvatar
                  size="sm"
                  isOnline={true}
                  imgSrc={userProfilePath}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 h-48 p-4 text-sm">
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center gap-1 my-2 text-sm cursor-pointer">
                        Available <Check size={10} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                      <div className="mt-2 p-1 text-sm hover:bg-gray-100 cursor-pointer">
                        Manage Account
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                      <div className="mt-2 p-1 text-sm hover:bg-gray-100 cursor-pointer">
                        Manage Account
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
