import { NextRequest, NextResponse } from "next/server";
import constants from "@/constants";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookie_data = request.cookies.get(constants.token.ACCESS_TOKEN)?.value;
  const publicPath = path === "/login" || path === "/register";

  if (publicPath) {
    if (cookie_data)
      return NextResponse.redirect(new URL("/", request.nextUrl));
    else {
      // alert("Could not find token, kindly login agin");
    }
  } else {
    if (!cookie_data)
      return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/login", "/register"],
};
