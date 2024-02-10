import React, { useState } from "react";

import DialogBox from "./DialogBox";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import UserAvatar from "./UserAvatar";
import useUserStore from "@/store/userStore";

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
    dark_theme: z.boolean(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dark_theme: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    let theme_value = "light";
    if (data.dark_theme) {
      theme_value = "dark";
    }
    setTheme(theme_value);
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
                      name="dark_theme"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm">
                          <p className="text-sm">Dark Theme</p>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button className="w-full h-12" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </main>
        }
      />
    </div>
  );
}
