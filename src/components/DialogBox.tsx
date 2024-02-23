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
  size?: string;
}

const DialogBox: React.FC<DialogProps> = ({
  open,
  handleClose,
  title,
  desciption,
  mainContent,
  footerContent,
  size = "md",
}) => {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "sm:max-w-xl";
      case "md":
        return "md:max-w-xl";
      case "lg":
        return "xl:max-w-4xl";
      case "xl":
        return "sm:max-w-xl";
      default:
        return "md:max-w-xl";
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`${getSizeClasses(size)}`}>
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
