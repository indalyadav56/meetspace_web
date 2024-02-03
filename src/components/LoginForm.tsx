"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import { useEffect } from "react";
import CookieService from "@/lib/cookies";
import constants from "@/constants";

const LoginForm = () => {
  const { loginUser, resetForm, loading, error, message, success, authData } =
    useAuthStore();

  const router = useRouter();
  const notify = (msg: string) => toast(msg);

  const formSchema = z.object({
    email: z.string().min(2, {
      message: "email must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "password must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser(values);
  }

  useEffect(() => {
    if (error && message) {
      notify(message);
      error.forEach((err) => {
        form.setError(err?.field, {
          type: "manual",
          message: err?.message,
        });
        form.setFocus(err?.field);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, message]);

  useEffect(() => {
    if (success) {
      CookieService.setCookie(
        constants.token.ACCESS_TOKEN,
        authData.data.token.access
      );
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <main>
      <ToastContainer />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

export default LoginForm;
