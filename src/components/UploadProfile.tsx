"use client";

import React, { useRef, useState } from "react";

import DialogBox from "./DialogBox";
import useUserStore from "@/store/userStore";
import { Button } from "./ui/button";

const UploadProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const { updateUser } = useUserStore();
  const fileRef = useRef();

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
  const handleFileUpload = () => {
    // fileRef?.current?.click();
  };

  const handleFileInputChange = (e: any) => {
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

  return (
    <div>
      <DialogBox
        open={false}
        title="Change your profile picture"
        handleClose={() => {
          //   setShowUserMenu(false);
          // setOpen(false);
        }}
        mainContent={
          <div className="flex items-center">
            <div className="flex-1 flex flex-col gap-4">
              <input
                type="file"
                hidden
                // ref={fileRef}
                // onChange={handleFileInputChange}
                accept=".jpg,.jpeg,.png"
              />
              <Button variant="outline" onClick={handleFileUpload}>
                Upload File
              </Button>
              <Button variant="outline">Remove picture</Button>
            </div>
            <div className="flex-1 flex justify-center items-center">
              {/* {imagePreview ? (
            <UserAvatar imgSrc={imagePreview} size="xl" />
          ) : (
            <UserAvatar imgSrc={userProfilePath} size="xl" />
          )} */}
            </div>
          </div>
        }
        footerContent={
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                // setShowUserMenu(false);
                // setOpen(false);
              }}
            >
              Close
            </Button>
            <Button onClick={handleUploadProfile}>Save</Button>
          </div>
        }
      />
    </div>
  );
};

export default UploadProfile;
