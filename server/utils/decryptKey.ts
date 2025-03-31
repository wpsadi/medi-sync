import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";

export const decryptKey = async (encryptedKey: string) => {
  const decoded = await verify(
    encryptedKey,
    Bun.env.JWT_SECRET as string,
    Bun.env.JWT_ALGORITHM as any
  ).catch((err) => {
    console.error(err.message);
    throw new HTTPException(500, { message: "Invalid token!" });
  });

  // console.log(decoded);

  return decoded;
};
