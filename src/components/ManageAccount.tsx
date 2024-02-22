import React, { useEffect, useState } from "react";

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
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import UserAvatar from "./UserAvatar";
import useUserStore from "@/store/userStore";
import { Input } from "./ui/input";

export default function ManageAccount({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const { currentUser } = useUserStore();
  const { setTheme } = useTheme();

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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("indal", data);
  }

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
        open={open}
        handleClose={handleClose}
        title="Manage Account"
        mainContent={
          <main>
            <div className="flex items-center my-4">
              <div className="flex-1 flex flex-col gap-4">
                <input type="file" hidden accept=".jpg,.jpeg,.png" />
                <Button variant="outline">Upload File</Button>
                <Button variant="outline">Remove picture</Button>
              </div>
              <div className="flex-1 flex justify-center items-center">
                {imagePreview ? (
                  <UserAvatar imgSrc={"imagePreview"} size="xl" />
                ) : (
                  <UserAvatar imgSrc={"userProfilePath"} size="xl" />
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
                      name="theme"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm">
                          <p className="text-sm">Dark Theme</p>
                          <FormControl>
                            <Switch
                              checked={field.value ? true : false}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
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
          </main>
        }
      />
    </div>
  );
}
