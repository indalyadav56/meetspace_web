"use client";

import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ClipLoader from "react-spinners/ClipLoader";

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
import CookieService from "@/lib/cookies";
import constants from "@/constants";

const RegisterForm = () => {
  const {
    registerUser,
    loading,
    error,
    message,
    success,
    authData,
    actionType,
  } = useAuthStore();
  const router = useRouter();
  const notify = (msg: string) => toast(msg);

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

  useEffect(() => {
    if (error && message) {
      notify(message);
      error.forEach((err: any) => {
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
    if (success && actionType == "register") {
      CookieService.setCookie(
        constants.token.ACCESS_TOKEN,
        authData.data.token.access
      );
      CookieService.setCookie(
        constants.token.REFRESH_TOKEN,
        authData.data.token.refresh
      );
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerUser(values);
  }

  return (
    <main>
      <ToastContainer />
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
          {!loading ? (
            <Button className="w-full h-14" type="submit">
              Submit
            </Button>
          ) : (
            <div className="flex justify-center">
              <ClipLoader
                color={"#ad1a1a"}
                loading={true}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </form>
      </Form>
    </main>
  );
};

export default RegisterForm;
