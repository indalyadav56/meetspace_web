import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface DrawerBoxProps {
  headerTitle?: string;
  description?: string;
  triggerContent?: React.ReactNode;
  content?: React.ReactNode;
}

const DrawerBox: React.FC<DrawerBoxProps> = (props) => {
  const { headerTitle, description, content, triggerContent } = props;
  return (
    <Sheet>
      <SheetTrigger asChild>{triggerContent}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{headerTitle}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {content}
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerBox;
