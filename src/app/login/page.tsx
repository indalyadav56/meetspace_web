"use client";

import Link from "next/link";

import LoginForm from "@/components/LoginForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import constants from "@/constants";
import useAuthStore from "@/store/authStore";

const LoginPage = () => {
  const { resetForm } = useAuthStore();

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Card className="w-1/4">
        <CardHeader>
          <span className="text-3xl">Login</span>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-2">
            <span className="text-sm">
              {constants.auth.NOT_REGISTER_MSG}
              <Link
                className="text-blue-400 font-semibold"
                href="/register"
                onClick={resetForm}
              >
                Register
              </Link>
            </span>
            <Link
              className="text-blue-400 font-semibold"
              href="/forgot-password"
              onClick={resetForm}
            >
              Forget Password?
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
