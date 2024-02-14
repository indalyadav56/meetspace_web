import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface DialogProps {
  open?: boolean;
  handleClose: () => void;
  title: string;
  desciption?: string;
  mainContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const DialogBox: React.FC<DialogProps> = ({
  open,
  handleClose,
  title,
  desciption,
  mainContent,
  footerContent,
}) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desciption}</DialogDescription>
        </DialogHeader>

        {mainContent}

        <DialogFooter>{footerContent}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
