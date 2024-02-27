import React, { useEffect, useRef, useState } from "react";

import DialogBox from "./DialogBox";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import UserAvatar from "./UserAvatar";
import useUserStore from "@/store/userStore";
import { Input } from "./ui/input";

import GeneralSettings from "./GeneralSettings";

export default function ManageAccount({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) {
  const [selectedFile, setSelectedFile] = useState();
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [currentTab, setCurrentTab] = useState("Account");

  const fileRef = useRef<HTMLInputElement>(null);
  const { currentUser, updateUser } = useUserStore();
  const { setTheme } = useTheme();

  const themes = ["light", "dark", "system"];

  const FormSchema = z.object({
    theme: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.optional(z.string()),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      theme: "",
      first_name: "",
      last_name: "",
      email: "",
    },
    values: currentUser,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const menus = [{ lable: "General" }, { lable: "Account" }];

  const handleThemeChange = (event: any) => {
    console.log("setTheme", event.target);
    // setTheme(theme)
  };

  const handleThemeUpdate = () => {
    setTheme("light");
    // updateUser({
    //   theme: "light",
    // });
  };

  const MenuClickHandler = (data: string) => {
    setCurrentTab(data);
  };

  return (
    <div>
      <DialogBox
        open={open}
        handleClose={handleClose}
        title="Manage Account"
        size="lg"
        mainContent={
          <main className="w-full flex bg-red">
            {/* left section */}
            <nav className="w-1/3 p-2">
              {menus.map((item) => (
                <Button
                  key={item.lable}
                  variant="secondary"
                  className="w-full justify-start my-1 bg-muted"
                  onClick={() => MenuClickHandler(item.lable)}
                >
                  {item.lable}
                </Button>
              ))}
            </nav>

            {/* right section */}
            <div className="flex-1">
              {currentTab === "General" && <GeneralSettings />}
              {currentTab === "Account" && (
                <div>
                  <div className="flex items-center my-4">
                    <div className="flex-1 flex flex-col gap-4">
                      <input
                        ref={fileRef}
                        type="file"
                        hidden
                        accept=".jpg,.jpeg,.png"
                        onClick={handleFileInputChange}
                      />
                      <Button variant="outline" onClick={handleFileUpload}>
                        Upload File
                      </Button>
                      <Button variant="outline">Remove picture</Button>
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                      {selectedFile && (
                        <UserAvatar
                          imgSrc={URL.createObjectURL(selectedFile)}
                          size="xl"
                        />
                      )}
                    </div>
                  </div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full space-y-6"
                    >
                      <div>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="First name" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Last name" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            disabled
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Email" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <Button className="w-full h-12" type="submit">
                        Update
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </main>
        }
      />
    </div>
  );
}
