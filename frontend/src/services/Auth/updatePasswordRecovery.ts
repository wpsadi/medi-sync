"use server";

import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

export const updateRecoveryPasswordDef = async (userId:string,secret:string,password:string)=>{
     
    try{
        const {data,error}=  await createSession()

        if (error){
            throw new Error(error)
        }

        const recovery = await data!.account.updateRecovery(userId,secret,password);

        //console.log(recovery)

        return {
            data:recovery,
            error:undefined
        }
    }catch(e:unknown){
        return handleError(e,"Unable to update your password")
    }
}
