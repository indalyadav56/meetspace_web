"use client";

import Link from "next/link";

import RegisterForm from "@/components/RegisterForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import constants from "@/constants";

const RegsiterPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center overflow-x-hidden">
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
  );
};

export default RegsiterPage;
