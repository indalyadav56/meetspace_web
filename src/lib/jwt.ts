import { jwtDecode } from "jwt-decode";
import CookieService from "./cookies";
import constants from "@/constants";

export interface TokenPayload {
  user_id: string;
}

export function getUserIdFromToken(): string | null {
  try {
    const accessToken = CookieService.getCookie(constants.token.ACCESS_TOKEN);
    if (accessToken) {
      const decoded = jwtDecode<TokenPayload>(accessToken);
      return decoded.user_id ?? null;
    }
    return null;
  } catch {
    return null;
  }
}
