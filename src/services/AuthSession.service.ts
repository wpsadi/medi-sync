
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { getCookie, removeCookie, setCookie } from "../utils/cookies";
import { sessionDef } from "./Auth/session";


const authCookieName = "auth";
export const cookieOptions: Partial<ResponseCookie> = {
  // httpOnly: true,
  // secure: true,
  sameSite: "strict",
  priority: "high",
  maxAge: 60 * 60 * 24 * 7, // 1 week
};

export class AuthSession {
  
  static async setSessionToken(token: string) {

    const response = await setCookie(authCookieName, token, cookieOptions);
    return response;
  }
  static async getSessionToken() {
  
    const response = await getCookie(authCookieName);
    return response;
  }

  static async removeSessionToken() {

    const response = await removeCookie(authCookieName);

    return response;
  }

  static async isAuthenticated() {
    const response =  await this.getSessionToken();

    if (response.error){
        return false
    }

    const {error} = await sessionDef();

    if (error){
        return false
    }

    return true
    
  }


}