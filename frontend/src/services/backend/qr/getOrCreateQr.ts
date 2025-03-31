"use server";

import { handleError } from "@/utils/errorHandler";

import { generateQRAPIDef } from "./generateQRAPI";
import { getQRAPIDef } from "./getQRAPI";



export const getOrCreateQRAPIDef = async () => {
    try{
        const response1 = await getQRAPIDef()

        if (response1.error){
            console.log("QR code not found, generating a new one", response1.error)
            if (response1.error === "QR code not found!"){
                //here we create a new QR code
                const response2 = await generateQRAPIDef()

                if (response2.error){
                    throw new Error(response2.error)}

                return {
                    error:undefined,
                    data:response2.data
                }
                
            }else{
                throw new Error(response1.error)

            }

        }

        return {
            error:undefined,
            data:response1.data
        }

    }catch(e){
        return handleError(e,"Unable to get or create QR code from backend")
    }
}