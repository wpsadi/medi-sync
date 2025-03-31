import { Account, AppwriteException, Client, Storage } from "appwrite";

export const client = new Client();
client.setProject(Bun.env.APPWRITE_PROJECT_ID as string);

export const storage = new Storage(client);

export const verifyToken = async (token: string) => {
  try {
    const newclinet = new Client();
    newclinet.setProject(Bun.env.APPWRITE_PROJECT_ID as string);
    newclinet.setSession(token);
    const account = new Account(newclinet);

    const user = await account.getSession("current");

    return user.userId;
  } catch (error) {
    console.log(error);
    if (error instanceof AppwriteException) {
      throw new Error(error.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to verify token!");
  }
};
