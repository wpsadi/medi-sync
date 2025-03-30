"use server";

import { ssrAxios } from "@/axios/ssrAxios";
import { sessionDef } from "@/services/Auth/session";
import { handleError } from "@/utils/errorHandler";

export const getQRAPIDef = async () => {
  try {
    const userId = await sessionDef();

    if (userId.error) {
      throw new Error(userId.error);
    }

    const response = await ssrAxios.get<{
        success: boolean;
        message: string;
        data?: {
            qrCodeUrl: string;
        }}>(`qr/${userId.data!.userId}`);


    if (!response.data) {
      throw new Error("Request failed for getting QR code from backend");
    }

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    console.log("QR code found", response.data.data?.qrCodeUrl);

    return {
      error: undefined,
      data: response.data.data!.qrCodeUrl,
    };


  } catch (e) {
    return handleError(e, "Unable to get QR code from backend");
  }
};
