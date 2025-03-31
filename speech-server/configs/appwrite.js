import { Account, AppwriteException, Client, Storage } from "appwrite";
import dotenv from "dotenv";
dotenv.config();


export const client = new Client();
client.setProject(process.env.APPWRITE_PROJECT_ID);

export const storage = new Storage(client);