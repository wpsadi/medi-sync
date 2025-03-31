import type { Context } from "hono";
import { sign } from "hono/jwt";

export const generateQrcCodeData = async (userId: string) => {
  const encryptedKey = await sign(
    { userId },
    Bun.env.JWT_SECRET as string,
    Bun.env.JWT_ALGORITHM as string
  );

  console.log(encryptedKey);

  const qrCodeData = `${Bun.env.FRONTEND_URL}/qr/${encryptedKey}`;
  return qrCodeData;
};
