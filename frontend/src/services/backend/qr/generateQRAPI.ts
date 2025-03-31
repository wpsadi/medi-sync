"use server";

import { ssrAxios } from "@/axios/ssrAxios";
import { sessionDef } from "@/services/Auth/session";
import { handleError } from "@/utils/errorHandler";

export const generateQRAPIDef = async () => {
    try{
        const userId = await sessionDef();

        if (userId.error){
            throw new Error(userId.error)
        }




        const response = await ssrAxios.post<{
            success: boolean;
            message: string;
            data?: {
                qrCodeUrl: string;
            };
        }>("qr/generate",{
            userId:userId.data!.userId
        })

        if (!response.data){
            throw new Error("Request failed for generating QR code")
        }

        if (!response.data.success){
            throw new Error(response.data.message)
        }

        return {
            error:undefined,
            data:response.data.data!.qrCodeUrl
        }



    }catch(e){
        return handleError (e,"Unable to generate QR code")
    }
}