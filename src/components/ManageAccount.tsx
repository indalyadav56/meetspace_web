import React, { useState } from "react";

import DialogBox from "./DialogBox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ManageAccount({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) {
  const { setTheme } = useTheme();

  return (
    <div>
      <DialogBox
        open={open}
        handleClose={handleClose}
        title="Manage Account"
        mainContent={
          <main>
            <Button onClick={() => setTheme("light")}>Set Dark Theme</Button>
            <div className="flex items-center space-x-2">
              <Label htmlFor="airplane-mode">Dark Theme</Label>
              <Switch id="airplane-mode" />
            </div>
          </main>
        }
      />
    </div>
  );
}
