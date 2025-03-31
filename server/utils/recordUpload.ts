import { file } from "bun";
import cloudinary from "../configs/cloudinary";
import { HTTPException } from "hono/http-exception";
import { storage } from "../configs/appwrite";
import { ID } from "appwrite";

export const uploadMedicalRecord = async (
  userId: string,
  filename: string,
  file: File
) => {
  try {
    const uploadResponse = await storage
      .createFile(Bun.env.APPWRITE_RECORD_PDFS_BUCKET_ID!, ID.unique(), file)
      .catch((err) => {
        console.log(err);
        throw new Error("Failed to upload record!");
      });

    const fileUrl = `${Bun.env.APPWRITE_ENDPOINT}/storage/buckets/${Bun.env.APPWRITE_RECORD_PDFS_BUCKET_ID}/files/${uploadResponse.$id}/view?project=${Bun.env.APPWRITE_PROJECT_ID}`;
    // console.log(fileUrl);

    return { fileUrl: fileUrl, fileType: uploadResponse?.mimeType };
  } catch (error) {
    console.log(error);
    throw new HTTPException(500, { message: "Failed to upload record!" });
  }
};
