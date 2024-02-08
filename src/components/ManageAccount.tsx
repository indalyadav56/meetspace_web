import React from "react";
import DialogBox from "./DialogBox";

export default function ManageAccount({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) {
  return (
    <div>
      <DialogBox open={open} handleClose={handleClose} title="Manage Account" />
    </div>
  );
}
