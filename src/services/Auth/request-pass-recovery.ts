"use server";

import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";
import { Url } from "@/utils/Url";


export const requestRecoveryPasswordDef = async (email:string)=>{
        try{

            const {data,error}=  await createSession()

            //console.log(error)

            if (error){
                throw new Error(error)
            }

            

            //console.log(Url.extendURL("auth","reset-password"))

            const recovery = await data!.account.createRecovery(email,Url.extendURL("auth","reset-password"));

            //console.log(recovery)

            return {
                data:recovery,
                error:undefined
            }

        }catch(e:unknown){
            return handleError(e,"Unable to send pasword recovery mail")
        }
    }