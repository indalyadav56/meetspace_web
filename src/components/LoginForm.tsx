"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

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
import Image from "next/image";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const { loginUser, loading, error, message, success, actionType } =
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
    if (success && actionType == "login") {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/v1/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8080/v1/auth/github";
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log("codeResponse", codeResponse);
      const tokenResponse = await axios.get(
        `http://localhost:8080/v1/auth/google/callback?code=${codeResponse.code}`
      );

      console.log("tokenResponse", tokenResponse);
    },
    flow: "auth-code",
  });

  return (
    <main>
      <ToastContainer />
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
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
          {loading ? (
            <div className="w-full flex justify-center">
              <ClipLoader size={60} loading={loading} />
            </div>
          ) : (
            <Button className="w-full h-12" type="submit">
              Login
            </Button>
          )}
        </form>
      </Form>
      <div className="w-full my-2 flex justify-center items-center">
        <hr className="w-full my-4 " />
        <span className="px-2 text-sm">or</span>
        <hr className="w-full " />
      </div>
      <div className="flex my-4 gap-4">
        <Button
          variant="outline"
          className="w-full h-12"
          onClick={handleGoogleLogin}
        >
          <Image
            src="/google.png"
            width={36}
            height={36}
            alt="google_logo"
            className="mr-2 h-4 w-4"
          />
          Google
        </Button>

        <Button
          variant="outline"
          className="w-full h-12"
          onClick={handleGithubLogin}
        >
          <Image
            src="/github.png"
            width={36}
            height={36}
            alt="google_logo"
            className="mr-2 h-4 w-4"
          />
          GitHub
        </Button>
      </div>
    </main>
  );
};

export default LoginForm;
