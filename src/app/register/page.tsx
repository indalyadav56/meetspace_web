"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RegisterForm from "@/components/RegisterForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import constants from "@/constants";
import useAuthStore from "@/store/authStore";

const RegsiterPage = () => {
  const [showError, setShowError] = useState(false);

  const { authData } = useAuthStore();
  const notify = (msg: string) => toast(msg);

  useEffect(() => {
    console.log("authData--->", authData);
    if (authData?.status_code === 400) {
      setShowError(true);
    }
  }, [authData]);

  useEffect(() => {
    if (showError) {
      notify(authData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showError]);

  return (
    <main>
      <ToastContainer />
      <div className="flex flex-col h-screen w-screen items-center justify-center">
        <Card className="w-1/4">
          <CardHeader>
            <span className="text-3xl">Register</span>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter>
            <span className="text-sm">
              {constants.auth.ALREADY_LOGIN_MSG}
              <Link className="text-blue-400 font-semibold" href="/login">
                Login
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default RegsiterPage;
