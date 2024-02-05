"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";
import DialogBox from "./DialogBox";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";

const CustomMenu = () => {
  // const dialogRef = useRef(null);

  const [dialgoOpen, setDialogOpen] = useState(false);

  // useEffect(() => {
  //   const handleOutsideClick = (event: any) => {
  //     // Close the dialog if click occurs outside the dialog
  //     if (dialogRef.current && !dialogRef.current?.contains(event.target)) {
  //       dialogRef.current.hidden = true;
  //     }
  //   };

  //   // Add event listener to detect outside clicks
  //   document.addEventListener("mousedown", handleOutsideClick);

  //   return () => {
  //     // Clean up the event listener on component unmount
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuSubTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-56">
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        </DropdownMenuSubContent>
      </DropdownMenu>

      <DialogBox
        open={dialgoOpen}
        handleClose={() => {
          // dialogRef.current.hidden = true;
          setDialogOpen(false);
        }}
        title="Upload picture"
        mainContent={
          <div>
            <input type="file" name="UPload profile" />
          </div>
        }
        footerContent={<Button onClick={() => {}}>Submit</Button>}
      />
    </>
  );
};

export default CustomMenu;
