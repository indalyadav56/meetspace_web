import React, { useState } from "react";

import DialogBox from "./DialogBox";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

export default function ManageAccount({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) {
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

  return (
    <div>
      <DialogBox
        open={open}
        handleClose={handleClose}
        title="Manage Account"
        mainContent={
          <main>
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
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </main>
        }
      />
    </div>
  );
}
