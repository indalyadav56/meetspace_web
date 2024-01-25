"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import constants from "@/constants";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <Card className="w-1/4">
        <CardHeader>
          <div className="flex gap-8">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft />
            </Button>
            <span className="text-3xl">Forgot Password?</span>
          </div>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
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

export default ForgotPasswordPage;
