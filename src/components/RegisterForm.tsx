"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAuthStore from "@/store/authStore";

const RegisterForm = () => {
  const { registerUser, authData } = useAuthStore();

  const formSchema = z.object({
    first_name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  // useEffect(() => {
  //   console.log("backend error data->", authData?.error);
  // }, [authData]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerUser(values);
  }

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          method="post"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frist Name</FormLabel>
                <FormControl>
                  <Input placeholder="first name" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input placeholder="last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full h-14" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default RegisterForm;
