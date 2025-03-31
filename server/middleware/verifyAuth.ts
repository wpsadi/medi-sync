import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { decode, verify } from "hono/jwt";
import { verifyToken } from "../configs/appwrite";

export const verifyAuth = async (c: Context, next: () => Promise<void>) => {
  let token;
  try {
    token = c.req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Token not found!");
    }

    const decoded = await verifyToken(token);

    console.log(decoded);
    c.set("user", decoded);

    await next();
  } catch (err: any) {
    // console.error(err);
    throw new HTTPException(401, {
      message: err.message,
    });
  }
};
