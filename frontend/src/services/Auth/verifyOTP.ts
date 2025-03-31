"use server";

import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

export const verifyEmailDef = async (userId:string,secret:string)=>{
         "use server"
        try{

            const {data,error}=  await createSession()

            if (error){
                throw new Error(error)
            }

            const verfication = await data!.account.updateVerification(userId,secret);

            //console.log(session)

            return {
                data:verfication,
                error:undefined
            }


        }catch(e:unknown){
            return handleError(e,"Unable to verify OTP")
        }
    }