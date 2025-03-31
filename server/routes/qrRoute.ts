import { Hono } from "hono";
import { generateQR, getQRCode } from "../controllers/qrController";
import { userIdSchema } from "../helpers/userSchema";
import { zValidator } from "@hono/zod-validator";

export const qrInstance = new Hono();

qrInstance.post("/generate", zValidator("json", userIdSchema), generateQR);
qrInstance.get("/:userId", zValidator("param", userIdSchema), getQRCode);
