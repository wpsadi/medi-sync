import { Hono } from "hono";
import { getUser, registerUser } from "../controllers/userController";
import {
  userDetailsSchema,
  userIdSchema,
  userKeySchema,
} from "../helpers/userSchema";
import { zValidator } from "@hono/zod-validator";

export const userInstance = new Hono();

userInstance.post(
  "/register",
  zValidator("json", userDetailsSchema),
  registerUser
);
userInstance.get("/:userId", zValidator("param", userIdSchema), getUser);
